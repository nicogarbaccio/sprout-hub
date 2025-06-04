import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PlantDetailsForm from "./edit-plant/PlantDetailsForm";
import WateringRecordForm from "./edit-plant/WateringRecordForm";
import WateringRecordsList from "./edit-plant/WateringRecordsList";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

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
  room?: string;
  suggested_watering_days?: number;
}

interface EditPlantDialogProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditPlantDialog = ({
  plant,
  isOpen,
  onClose,
  onUpdate,
}: EditPlantDialogProps) => {
  const { toast } = useToast();
  const [nickname, setNickname] = useState("");
  const [plantType, setPlantType] = useState("");
  const [image, setImage] = useState("");
  const [room, setRoom] = useState("");
  const [suggestedWateringDays, setSuggestedWateringDays] = useState<number>(7);
  const [wateringRecords, setWateringRecords] = useState<WateringRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (plant) {
      setNickname(plant.nickname);
      setPlantType(plant.plant_type);
      setImage(plant.image || "");
      setRoom(plant.room || "");
      setSuggestedWateringDays(plant.suggested_watering_days || 7);
      loadWateringRecords(plant.id);
    }
  }, [plant]);

  const loadWateringRecords = async (plantId: string) => {
    try {
      const { data, error } = await supabase
        .from("watering_records")
        .select("*")
        .eq("plant_id", plantId)
        .order("watered_at", { ascending: false });

      if (error) throw error;
      setWateringRecords(data || []);
    } catch (error) {
      console.error("Error loading watering records:", error);
      toast({
        title: "Error",
        description: "Failed to load watering records",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!plant) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("user_plants")
        .update({
          nickname,
          plant_type: plantType,
          image: image || null,
          room: room || null,
          suggested_watering_days: suggestedWateringDays,
          updated_at: new Date().toISOString(),
        })
        .eq("id", plant.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Plant updated successfully",
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating plant:", error);
      toast({
        title: "Error",
        description: "Failed to update plant",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddWatering = async (date: Date, notes: string) => {
    if (!plant) return;

    try {
      const { error } = await supabase.from("watering_records").insert({
        plant_id: plant.id,
        watered_at: date.toISOString(),
        notes: notes || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Watering record added",
      });

      loadWateringRecords(plant.id);
    } catch (error) {
      console.error("Error adding watering record:", error);
      toast({
        title: "Error",
        description: "Failed to add watering record",
        variant: "destructive",
      });
    }
  };

  const handleDeleteWatering = async (recordId: string) => {
    try {
      const { error } = await supabase
        .from("watering_records")
        .delete()
        .eq("id", recordId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Watering record deleted",
      });

      if (plant) {
        loadWateringRecords(plant.id);
      }
    } catch (error) {
      console.error("Error deleting watering record:", error);
      toast({
        title: "Error",
        description: "Failed to delete watering record",
        variant: "destructive",
      });
    }
  };

  const handleDeletePlant = async () => {
    if (!plant) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("user_plants")
        .delete()
        .eq("id", plant.id);
      if (error) throw error;
      toast({
        title: "Plant deleted",
        description: "The plant has been removed from your collection.",
      });
      setIsDeleteDialogOpen(false);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error deleting plant:", error);
      toast({
        title: "Error",
        description: "Failed to delete plant",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
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
            room={room}
            setRoom={setRoom}
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
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Danger Zone for Delete Plant */}
          <div className="mt-8 border border-red-200 bg-red-50 rounded-lg p-6 flex flex-col items-center">
            <h4 className="text-red-700 font-semibold mb-2">Danger Zone</h4>
            <p className="text-sm text-red-600 mb-4 text-center">
              Deleting this plant will remove it and all its watering records
              from your collection. This action cannot be undone.
            </p>
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={isLoading || isDeleting}
                >
                  Delete Plant
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Plant</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this plant? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleDeletePlant}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlantDialog;
