import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DangerZoneProps {
  handleDeleteAccount: () => Promise<void>;
  isLoading: boolean;
}

const DangerZone: React.FC<DangerZoneProps> = ({
  handleDeleteAccount,
  isLoading,
}) => {
  return (
    <Card className="border-red-200 dark:border-red-800/50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Trash2 className="w-5 h-5 text-sprout-warning dark:text-sprout-warning" />
          <CardTitle className="text-sprout-warning dark:text-sprout-warning">
            Danger Zone
          </CardTitle>
        </div>
        <CardDescription>
          Irreversible actions that affect your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={handleDeleteAccount}
          disabled={isLoading}
          variant="destructive"
          className="w-full bg-sprout-warning hover:bg-sprout-warning/90 dark:bg-sprout-warning/80 dark:hover:bg-sprout-warning/70"
        >
          {isLoading ? "Deleting..." : "Delete Account"}
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          This will permanently delete your account and all associated data.
        </p>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
