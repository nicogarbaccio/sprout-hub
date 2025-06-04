# Database Migration - Add Room Field

## Overview
This migration adds a `room` column to the `user_plants` table to enable room-based organization of plants.

## Required SQL Commands

### 1. Add room column to user_plants table
```sql
ALTER TABLE user_plants ADD COLUMN room TEXT;
```

### 2. Update the plants_with_watering_info view
Since the view likely includes all columns from user_plants, it should automatically include the new room column. However, if you need to recreate it:

```sql
-- First, drop the existing view
DROP VIEW IF EXISTS plants_with_watering_info;

-- Recreate the view (adjust based on your actual view definition)
CREATE VIEW plants_with_watering_info AS
SELECT 
    up.*,
    wr.latest_watering,
    CASE 
        WHEN wr.latest_watering IS NOT NULL 
        THEN EXTRACT(DAY FROM (NOW() - wr.latest_watering::timestamp))::integer
        ELSE NULL 
    END as days_since_watering
FROM user_plants up
LEFT JOIN (
    SELECT DISTINCT ON (plant_id) 
        plant_id, 
        watered_at as latest_watering
    FROM watering_records 
    ORDER BY plant_id, watered_at DESC
) wr ON up.id = wr.plant_id;
```

## Migration Steps in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the ALTER TABLE command to add the room column
4. Verify the plants_with_watering_info view includes the room column
5. Test by inserting a plant with a room value

## Rollback Instructions

If you need to rollback this migration:

```sql
ALTER TABLE user_plants DROP COLUMN room;
-- The view should automatically reflect this change
```

## Notes

- The room field is nullable, so existing plants will have NULL for room
- The frontend will treat NULL rooms as "Unassigned"
- Room values can be either predefined room identifiers (e.g., 'living-room') or custom text
- Consider adding an index if you plan to filter by room frequently:
  ```sql
  CREATE INDEX idx_user_plants_room ON user_plants(room);
  ``` 