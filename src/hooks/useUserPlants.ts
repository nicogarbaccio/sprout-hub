
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface UserPlant {
  id: string;
  nickname: string;
  plant_type: string;
  image?: string;
  suggested_watering_days?: number;
  latest_watering?: string;
  days_since_watering?: number;
  created_at: string;
  updated_at: string;
}

export const useUserPlants = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlants = async () => {
    if (!user) {
      setPlants([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('plants_with_watering_info')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlants(data || []);
    } catch (error) {
      console.error('Error fetching plants:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your plants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (plantData: { 
    nickname: string; 
    plant_type: string; 
    image?: string; 
    suggested_watering_days?: number;
    last_watered_date?: string;
  }) => {
    if (!user) return false;

    try {
      // First, insert the plant
      const { data: plantResult, error: plantError } = await supabase
        .from('user_plants')
        .insert({
          nickname: plantData.nickname,
          plant_type: plantData.plant_type,
          image: plantData.image,
          suggested_watering_days: plantData.suggested_watering_days,
          user_id: user.id,
        })
        .select()
        .single();

      if (plantError) throw plantError;

      // If a last watered date was provided, create a watering record
      if (plantData.last_watered_date && plantResult) {
        const { error: wateringError } = await supabase
          .from('watering_records')
          .insert({
            plant_id: plantResult.id,
            watered_at: plantData.last_watered_date,
            notes: 'Initial watering record from plant creation',
          });

        if (wateringError) {
          console.error('Error creating initial watering record:', wateringError);
          // Don't fail the plant creation if watering record fails
        }
      }

      toast({
        title: 'Success',
        description: 'Plant added successfully',
      });
      
      fetchPlants();
      return true;
    } catch (error) {
      console.error('Error adding plant:', error);
      toast({
        title: 'Error',
        description: 'Failed to add plant',
        variant: 'destructive',
      });
      return false;
    }
  };

  const waterPlant = async (plantId: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('watering_records')
        .insert({
          plant_id: plantId,
          watered_at: new Date().toISOString(),
          notes: notes || null,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Plant watered successfully',
      });
      
      fetchPlants();
      return true;
    } catch (error) {
      console.error('Error watering plant:', error);
      toast({
        title: 'Error',
        description: 'Failed to record watering',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [user]);

  return {
    plants,
    loading,
    fetchPlants,
    addPlant,
    waterPlant,
  };
};
