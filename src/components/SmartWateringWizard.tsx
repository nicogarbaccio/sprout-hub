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
        "cursor-pointer transition-all hover:shadow-md border-2 bg-sprout-primary text-sprout-white border-sprout-medium",
        currentValue === value
          ? "border-sprout-success bg-sprout-success/20"
          : "border-sprout-medium hover:border-sprout-success/50"
      )}
      onClick={() => onClick(value)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-sprout-white">{label}</h4>
            {description && (
              <p className="text-sm text-sprout-light mt-1">{description}</p>
            )}
          </div>
          {currentValue === value && (
            <CheckCircle className="w-5 h-5 text-sprout-success flex-shrink-0 ml-2" />
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Lightbulb className="w-12 h-12 text-sprout-light mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-sprout-white">
          How big is your {plantName}?
        </h3>
        <p className="text-sprout-light">
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
        <Thermometer className="w-12 h-12 text-sprout-light mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-sprout-white">
          Environmental Conditions
        </h3>
        <p className="text-sprout-light">
          These factors affect how quickly your plant uses water
        </p>
      </div>

      {/* Light Level */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 text-sprout-white">
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
        <Label className="text-base font-medium flex items-center gap-2 text-sprout-white">
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
        <Label className="text-base font-medium flex items-center gap-2 text-sprout-white">
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
        <Heart className="w-12 h-12 text-sprout-light mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-sprout-white">
          Personal Preferences
        </h3>
        <p className="text-sprout-light">
          Let's personalize the schedule to your care style
        </p>
      </div>

      {/* Care Style */}
      <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2 text-sprout-white">
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
        <Label className="text-base font-medium flex items-center gap-2 text-sprout-white">
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
      <div className="p-4 bg-sprout-medium/20 rounded-lg border border-sprout-medium">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-sprout-light" />
          <span className="font-medium text-sprout-white">Current Season</span>
        </div>
        <p className="text-sm text-sprout-light">
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
          <CheckCircle className="w-12 h-12 text-sprout-light mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-sprout-white">
            Your Personalized Schedule
          </h3>
          <p className="text-sprout-light">
            Based on your inputs, here's the optimal watering schedule
          </p>
        </div>

        {/* Main Result */}
        <Card className="border-sprout-success bg-sprout-primary/50">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-sprout-light mb-1">
                  Recommended Schedule
                </p>
                <p className="text-3xl font-bold text-sprout-success">
                  Every {result.recommendedDays} days
                </p>
              </div>

              <div className="flex justify-center items-center gap-4 text-sm">
                <div className="text-sprout-light">
                  Base: {result.baseDays} days
                </div>
                <div
                  className={cn(
                    "font-medium",
                    isIncrease && "text-sprout-warning",
                    isDecrease && "text-sprout-water",
                    noChange && "text-sprout-success"
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
          <Card className="bg-sprout-primary/30 border-sprout-medium">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-sprout-water" />
                <h4 className="font-medium text-sprout-white">
                  Why this schedule?
                </h4>
              </div>
              <ul className="space-y-2">
                {result.adjustmentReasons.map((reason, index) => (
                  <li key={index} className="text-sm text-sprout-light">
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
            className="flex-1 border-sprout-light text-sprout-light hover:bg-sprout-light hover:text-sprout-dark"
          >
            Adjust Settings
          </Button>
          <Button
            onClick={handleApplySchedule}
            className="flex-1 bg-sprout-success hover:bg-sprout-success/90 text-sprout-white"
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-sprout-dark text-sprout-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sprout-white">
            <Brain className="w-5 h-5 text-sprout-light" />
            Smart Watering Schedule
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-sprout-light">
            <span>
              Step {currentStep} of {STEPS.length}
            </span>
            <span>
              {Math.round(((currentStep - 1) / STEPS.length) * 100)}% complete
            </span>
          </div>
          <Progress
            value={((currentStep - 1) / STEPS.length) * 100}
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
                  ? "text-sprout-success"
                  : "text-sprout-medium"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-1 border-2",
                  step.id < currentStep
                    ? "bg-sprout-success border-sprout-success text-sprout-white"
                    : step.id === currentStep
                    ? "border-sprout-success bg-sprout-success/20"
                    : "border-sprout-medium"
                )}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.icon
                )}
              </div>
              <span className="text-xs font-medium text-sprout-white">
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
              className="flex items-center gap-2 border-sprout-light text-sprout-light hover:bg-sprout-light hover:text-sprout-dark"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={!canProceedToNextStep()}
              className="flex items-center gap-2 bg-sprout-success hover:bg-sprout-success/90 text-sprout-white"
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
