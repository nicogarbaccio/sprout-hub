
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PlantDetailsForm from './edit-plant/PlantDetailsForm';
import WateringRecordForm from './edit-plant/WateringRecordForm';
import WateringRecordsList from './edit-plant/WateringRecordsList';

interface WateringRecord {
  id: string;
  watered_at: string;
  notes?: string;
}

interface Plant {
  id: string;
  nickname: string;
  plant_type: string;
  image?: string;
  suggested_watering_days?: number;
}

interface EditPlantDialogProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditPlantDialog = ({ plant, isOpen, onClose, onUpdate }: EditPlantDialogProps) => {
  const { toast } = useToast();
  const [nickname, setNickname] = useState('');
  const [plantType, setPlantType] = useState('');
  const [image, setImage] = useState('');
  const [suggestedWateringDays, setSuggestedWateringDays] = useState<number>(7);
  const [wateringRecords, setWateringRecords] = useState<WateringRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (plant) {
      setNickname(plant.nickname);
      setPlantType(plant.plant_type);
      setImage(plant.image || '');
      setSuggestedWateringDays(plant.suggested_watering_days || 7);
      loadWateringRecords(plant.id);
    }
  }, [plant]);

  const loadWateringRecords = async (plantId: string) => {
    try {
      const { data, error } = await supabase
        .from('watering_records')
        .select('*')
        .eq('plant_id', plantId)
        .order('watered_at', { ascending: false });

      if (error) throw error;
      setWateringRecords(data || []);
    } catch (error) {
      console.error('Error loading watering records:', error);
      toast({
        title: 'Error',
        description: 'Failed to load watering records',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!plant) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_plants')
        .update({
          nickname,
          plant_type: plantType,
          image: image || null,
          suggested_watering_days: suggestedWateringDays,
          updated_at: new Date().toISOString(),
        })
        .eq('id', plant.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Plant updated successfully',
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating plant:', error);
      toast({
        title: 'Error',
        description: 'Failed to update plant',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWatering = async (date: Date, notes: string) => {
    if (!plant) return;

    try {
      const { error } = await supabase
        .from('watering_records')
        .insert({
          plant_id: plant.id,
          watered_at: date.toISOString(),
          notes: notes || null,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Watering record added',
      });
      
      loadWateringRecords(plant.id);
    } catch (error) {
      console.error('Error adding watering record:', error);
      toast({
        title: 'Error',
        description: 'Failed to add watering record',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteWatering = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from('watering_records')
        .delete()
        .eq('id', recordId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Watering record deleted',
      });
      
      if (plant) {
        loadWateringRecords(plant.id);
      }
    } catch (error) {
      console.error('Error deleting watering record:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete watering record',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Plant Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <PlantDetailsForm
            nickname={nickname}
            setNickname={setNickname}
            plantType={plantType}
            setPlantType={setPlantType}
            image={image}
            setImage={setImage}
            suggestedWateringDays={suggestedWateringDays}
            setSuggestedWateringDays={setSuggestedWateringDays}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Watering History</h3>
            
            <WateringRecordForm onAddWatering={handleAddWatering} />
            <WateringRecordsList 
              records={wateringRecords} 
              onDeleteRecord={handleDeleteWatering} 
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlantDialog;
