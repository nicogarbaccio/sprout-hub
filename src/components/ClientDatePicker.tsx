'use client';

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ClientDatePickerProps {
  selected: Date;
  onChange: (date: Date | null) => void;
  maxDate: Date;
}

export function ClientDatePicker({ selected, onChange, maxDate }: ClientDatePickerProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    // Initialize the date state after mounting to ensure client-side only
    try {
      const parsedDate = selected instanceof Date ? selected : new Date(selected);
      if (!isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      }
    } catch (error) {
      console.error('Error parsing date:', error);
      setSelectedDate(new Date());
    }
  }, [selected]);

  // Return a placeholder during SSR and before mounting
  if (!mounted) {
    return (
      <div className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date);
            onChange(date);
          }
        }}
        maxDate={maxDate instanceof Date ? maxDate : new Date(maxDate)}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
        dateFormat="MMMM d, yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={10}
      />
    </div>
  );
} 