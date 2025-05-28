
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [newWateringDate, setNewWateringDate] = useState<Date>();
  const [newWateringNotes, setNewWateringNotes] = useState('');
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

  const handleAddWatering = async () => {
    if (!plant || !newWateringDate) return;

    try {
      const { error } = await supabase
        .from('watering_records')
        .insert({
          plant_id: plant.id,
          watered_at: newWateringDate.toISOString(),
          notes: newWateringNotes || null,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Watering record added',
      });
      
      setNewWateringDate(undefined);
      setNewWateringNotes('');
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
          {/* Plant Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plant Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter plant nickname"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plantType">Plant Type</Label>
              <Input
                id="plantType"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                placeholder="Enter plant type"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wateringSchedule">Watering Schedule (days)</Label>
              <Input
                id="wateringSchedule"
                type="number"
                min="1"
                max="365"
                value={suggestedWateringDays}
                onChange={(e) => setSuggestedWateringDays(parseInt(e.target.value) || 7)}
                placeholder="Enter days between watering"
              />
              <p className="text-xs text-muted-foreground">
                How often should this plant be watered (in days)
              </p>
            </div>
          </div>

          {/* Watering Records */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Watering History</h3>
            
            {/* Add New Watering */}
            <div className="p-4 border rounded-lg space-y-3">
              <h4 className="font-medium">Add Watering Record</h4>
              
              <div className="space-y-2">
                <Label>Date Watered</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !newWateringDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newWateringDate ? format(newWateringDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newWateringDate}
                      onSelect={setNewWateringDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={newWateringNotes}
                  onChange={(e) => setNewWateringNotes(e.target.value)}
                  placeholder="Add any notes about this watering..."
                  rows={2}
                />
              </div>

              <Button 
                onClick={handleAddWatering}
                disabled={!newWateringDate}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Watering Record
              </Button>
            </div>

            {/* Existing Watering Records */}
            <div className="space-y-2">
              {wateringRecords.length > 0 ? (
                wateringRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">
                        {format(new Date(record.watered_at), "PPP")}
                      </div>
                      {record.notes && (
                        <div className="text-sm text-muted-foreground">{record.notes}</div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteWatering(record.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">No watering records yet</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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
