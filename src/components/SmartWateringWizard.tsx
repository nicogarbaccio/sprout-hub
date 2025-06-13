import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Thermometer,
  Droplets,
  Calendar,
  Heart,
  Shovel,
  Settings,
  Leaf,
} from "lucide-react";
import {
  WateringFactors,
  SmartScheduleResult,
  calculateSmartWateringSchedule,
  getCurrentSeason,
  getFactorLabels,
} from "@/utils/smartWateringSchedule";
import { cn } from "@/lib/utils";
import { useSmartWateringPreferences } from "@/hooks/useSmartWateringPreferences";

interface SmartWateringWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySchedule: (days: number) => void;
  baseDays: number;
  plantName: string;
}

interface StepData {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const STEPS: StepData[] = [
  {
    id: 1,
    title: "Plant Size",
    subtitle: "How big is your plant?",
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Environment",
    subtitle: "Light, temperature & humidity",
    icon: <Thermometer className="w-5 h-5" />,
  },
  {
    id: 3,
    title: "Preferences",
    subtitle: "Your care style & soil type",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 4,
    title: "Results",
    subtitle: "Your personalized schedule",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

export const SmartWateringWizard = ({
  isOpen,
  onClose,
  onApplySchedule,
  baseDays,
  plantName,
}: SmartWateringWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [factors, setFactors] = useState<Partial<WateringFactors>>(() => ({
    plantSize: undefined,
    lightLevel: undefined,
    temperature: undefined,
    humidity: undefined,
    season: getCurrentSeason(), // Keep season as it's contextual to current time
    careStyle: undefined,
    soilType: undefined,
  }));
  const [result, setResult] = useState<SmartScheduleResult | null>(null);

  const { preferences, getDefaultFactors } = useSmartWateringPreferences();

  const labels = getFactorLabels();

  // Initialize factors from user preferences if available
  const initializeFromPreferences = () => {
    const defaultFactors = getDefaultFactors();
    setFactors((prev) => ({
      ...prev,
      // Only set from preferences if they exist, don't provide fallback defaults
      lightLevel: defaultFactors.lightLevel || undefined,
      temperature: defaultFactors.temperature || undefined,
      humidity: defaultFactors.humidity || undefined,
      careStyle: defaultFactors.careStyle || undefined,
      soilType: defaultFactors.soilType || undefined,
    }));
  };

  // Initialize on first render if preferences are available
  useEffect(() => {
    if (preferences) {
      initializeFromPreferences();
    }
  }, [preferences]);

  const updateFactor = <K extends keyof WateringFactors>(
    key: K,
    value: WateringFactors[K]
  ) => {
    setFactors((prev) => ({ ...prev, [key]: value }));
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return !!factors.plantSize;
      case 2:
        return !!(
          factors.lightLevel &&
          factors.temperature &&
          factors.humidity
        );
      case 3:
        return !!(factors.careStyle && factors.soilType);
      default:
        return true;
    }
  };

  const goToNextStep = () => {
    if (currentStep === 3) {
      // Calculate result when moving to results step
      if (
        factors.plantSize &&
        factors.lightLevel &&
        factors.temperature &&
        factors.humidity &&
        factors.season &&
        factors.careStyle &&
        factors.soilType
      ) {
        const calculatedResult = calculateSmartWateringSchedule(
          baseDays,
          factors as WateringFactors
        );
        setResult(calculatedResult);
      }
    }
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleApplySchedule = () => {
    if (result) {
      onApplySchedule(result.recommendedDays);
      onClose();
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFactors({
      plantSize: undefined,
      lightLevel: undefined,
      temperature: undefined,
      humidity: undefined,
      season: getCurrentSeason(), // Keep season as it's contextual to current time
      careStyle: undefined,
      soilType: undefined,
    });
    setResult(null);
  };

  const renderOptionCard = <T extends string>(
    value: T,
    currentValue: T | undefined,
    onClick: (value: T) => void,
    label: string,
    description?: string
  ) => (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-md border-2 bg-white text-foreground dark:bg-green-900 dark:text-white border-zinc-300 dark:border-green-800",
        currentValue === value
          ? "border-plant-primary bg-plant-primary/5 dark:bg-green-800/60 dark:border-green-400"
          : "border-zinc-300 dark:border-green-800 hover:border-plant-primary/50 dark:hover:border-green-400"
      )}
      onClick={() => onClick(value)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-plant-text dark:text-zinc-100">
              {label}
            </h4>
            {description && (
              <p className="text-sm text-muted-foreground dark:text-zinc-300 mt-1">
                {description}
              </p>
            )}
          </div>
          {currentValue === value && (
            <CheckCircle className="w-5 h-5 text-plant-primary flex-shrink-0 ml-2" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Lightbulb className="w-12 h-12 text-plant-primary dark:text-green-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-plant-text dark:text-white">
          How big is your {plantName}?
        </h3>
        <p className="text-muted-foreground dark:text-zinc-300">
          Plant size affects how much water the soil can hold
        </p>
      </div>

      <div className="space-y-3">
        {(
          Object.keys(labels.plantSize) as Array<keyof typeof labels.plantSize>
        ).map((size) =>
          renderOptionCard(
            size,
            factors.plantSize,
            (value) => updateFactor("plantSize", value),
            labels.plantSize[size]
          )
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Thermometer className="w-12 h-12 text-plant-primary dark:text-green-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-plant-text dark:text-white">
          Environmental Conditions
        </h3>
        <p className="text-muted-foreground dark:text-zinc-300">
          These factors affect how quickly your plant uses water
        </p>
      </div>

      {/* Light Level */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 dark:text-zinc-200">
          <Lightbulb className="w-4 h-4" />
          Light Conditions
        </Label>
        <div className="space-y-2">
          {(
            Object.keys(labels.lightLevel) as Array<
              keyof typeof labels.lightLevel
            >
          ).map((level) =>
            renderOptionCard(
              level,
              factors.lightLevel,
              (value) => updateFactor("lightLevel", value),
              level.charAt(0).toUpperCase() + level.slice(1),
              labels.lightLevel[level]
            )
          )}
        </div>
      </div>

      {/* Temperature */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 dark:text-zinc-200">
          <Thermometer className="w-4 h-4" />
          Room Temperature
        </Label>
        <div className="space-y-2">
          {(
            Object.keys(labels.temperature) as Array<
              keyof typeof labels.temperature
            >
          ).map((temp) =>
            renderOptionCard(
              temp,
              factors.temperature,
              (value) => updateFactor("temperature", value),
              temp.charAt(0).toUpperCase() + temp.slice(1),
              labels.temperature[temp]
            )
          )}
        </div>
      </div>

      {/* Humidity */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 dark:text-zinc-200">
          <Droplets className="w-4 h-4" />
          Air Humidity
        </Label>
        <div className="space-y-2">
          {(
            Object.keys(labels.humidity) as Array<keyof typeof labels.humidity>
          ).map((humidity) =>
            renderOptionCard(
              humidity,
              factors.humidity,
              (value) => updateFactor("humidity", value),
              humidity.charAt(0).toUpperCase() + humidity.slice(1),
              labels.humidity[humidity]
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-plant-primary dark:text-green-400 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-plant-text dark:text-white">
          Personal Preferences
        </h3>
        <p className="text-muted-foreground dark:text-zinc-300">
          Let's personalize the schedule to your care style
        </p>
      </div>

      {/* Care Style */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 dark:text-zinc-200">
          <Heart className="w-4 h-4" />
          Care Style
        </Label>
        <div className="space-y-2">
          {(
            Object.keys(labels.careStyle) as Array<
              keyof typeof labels.careStyle
            >
          ).map((style) =>
            renderOptionCard(
              style,
              factors.careStyle,
              (value) => updateFactor("careStyle", value),
              labels.careStyle[style]
            )
          )}
        </div>
      </div>

      {/* Soil Type */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 dark:text-zinc-200">
          <Shovel className="w-4 h-4" />
          Soil Type
        </Label>
        <div className="space-y-2">
          {(
            Object.keys(labels.soilType) as Array<keyof typeof labels.soilType>
          ).map((soil) =>
            renderOptionCard(
              soil,
              factors.soilType,
              (value) => updateFactor("soilType", value),
              labels.soilType[soil]
            )
          )}
        </div>
      </div>

      {/* Season Info */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="font-medium text-blue-900">Current Season</span>
        </div>
        <p className="text-sm text-blue-700">
          We've automatically set this to{" "}
          <span className="font-medium">
            {labels.season[factors.season as keyof typeof labels.season]}
          </span>{" "}
          based on the current date.
        </p>
      </div>
    </div>
  );

  const renderStep4 = () => {
    if (!result) return null;

    const isIncrease = result.totalAdjustment > 0;
    const isDecrease = result.totalAdjustment < 0;
    const noChange = result.totalAdjustment === 0;

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <CheckCircle className="w-12 h-12 text-plant-primary dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-plant-text dark:text-white">
            Your Personalized Schedule
          </h3>
          <p className="text-muted-foreground dark:text-zinc-300">
            Based on your inputs, here's the optimal watering schedule
          </p>
        </div>

        {/* Main Result */}
        <Card className="border-plant-primary dark:bg-green-900/50 dark:border-green-400">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground dark:text-zinc-300 mb-1">
                  Recommended Schedule
                </p>
                <p className="text-3xl font-bold text-plant-primary dark:text-green-400">
                  Every {result.recommendedDays} days
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 text-sm">
                <div className="text-muted-foreground dark:text-zinc-300">
                  Base: {result.baseDays} days
                </div>
                <div
                  className={cn(
                    "font-medium",
                    isIncrease && "text-orange-600",
                    isDecrease && "text-blue-600",
                    noChange && "text-green-600"
                  )}
                >
                  {noChange
                    ? "No adjustment needed"
                    : `${isIncrease ? "+" : ""}${result.totalAdjustment} days`}
                </div>
              </div>

              <Badge
                variant={
                  result.confidence === "high"
                    ? "default"
                    : result.confidence === "medium"
                    ? "secondary"
                    : "destructive"
                }
                className="mx-auto"
              >
                {result.confidence} confidence
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Explanation */}
        {result.adjustmentReasons.length > 0 && (
          <Card className="dark:bg-green-900/30 dark:border-green-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-plant-text dark:text-white">
                  Why this schedule?
                </h4>
              </div>
              <ul className="space-y-2">
                {result.adjustmentReasons.map((reason, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground dark:text-zinc-300"
                  >
                    • {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleStartOver}
            className="flex-1 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-green-900"
          >
            Adjust Settings
          </Button>
          <Button
            onClick={handleApplySchedule}
            className="flex-1 bg-plant-primary hover:bg-plant-primary/90 dark:bg-green-400 dark:text-green-900 dark:hover:bg-green-300"
          >
            Use This Schedule
          </Button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-background text-foreground dark:bg-green-950 dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-plant-text dark:text-white">
            <Brain className="w-5 h-5 text-plant-primary" />
            Smart Watering Schedule
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground dark:text-zinc-300">
            <span>
              Step {currentStep} of {STEPS.length}
            </span>
            <span>
              {Math.round((currentStep / STEPS.length) * 100)}% complete
            </span>
          </div>
          <Progress
            value={(currentStep / STEPS.length) * 100}
            className="h-2"
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center py-4">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex flex-col items-center text-center flex-1",
                step.id <= currentStep
                  ? "text-plant-primary dark:text-green-400"
                  : "text-muted-foreground dark:text-zinc-400"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2",
                  step.id < currentStep
                    ? "bg-plant-primary border-plant-primary text-white dark:bg-green-400 dark:border-green-400"
                    : step.id === currentStep
                    ? "border-plant-primary bg-plant-primary/10 dark:border-green-400 dark:bg-green-400/20"
                    : "border-gray-300 dark:border-zinc-600"
                )}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              <span className="text-xs font-medium dark:text-zinc-200">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-4">{renderStepContent()}</div>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={goToPreviousStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-green-900"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={!canProceedToNextStep()}
              className="flex items-center gap-2 bg-plant-primary hover:bg-plant-primary/90 dark:bg-green-400 dark:text-green-900 dark:hover:bg-green-300"
            >
              {currentStep === 3 ? "Calculate Schedule" : "Continue"}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
