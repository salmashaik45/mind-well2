import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Wind, Heart, Moon, Flower, Play, Pause, RotateCcw } from "lucide-react";

const exercises = [
  {
    id: 1,
    title: "4-7-8 Breathing",
    description: "A calming breathing technique to reduce anxiety and promote relaxation",
    icon: Wind,
    category: "Breathing",
    duration: 240, // 4 minutes
    steps: [
      "Sit comfortably with your back straight",
      "Exhale completely through your mouth",
      "Inhale through your nose for 4 counts",
      "Hold your breath for 7 counts", 
      "Exhale through your mouth for 8 counts",
      "Repeat this cycle 4 times"
    ]
  },
  {
    id: 2,
    title: "Progressive Muscle Relaxation",
    description: "Systematically tense and relax muscle groups to reduce physical tension",
    icon: Heart,
    category: "Relaxation",
    duration: 900, // 15 minutes
    steps: [
      "Lie down in a comfortable position",
      "Start with your toes - tense for 5 seconds, then relax",
      "Move to your calves - tense for 5 seconds, then relax",
      "Continue with thighs, abdomen, hands, arms, shoulders",
      "Finish with facial muscles",
      "Notice the difference between tension and relaxation"
    ]
  },
  {
    id: 3,
    title: "5-4-3-2-1 Grounding",
    description: "Use your senses to stay present and reduce anxiety or panic",
    icon: Brain,
    category: "Mindfulness",
    duration: 300, // 5 minutes
    steps: [
      "Name 5 things you can see around you",
      "Name 4 things you can touch",
      "Name 3 things you can hear",
      "Name 2 things you can smell",
      "Name 1 thing you can taste",
      "Take deep breaths throughout"
    ]
  },
  {
    id: 4,
    title: "Body Scan Meditation",
    description: "Mindfully focus on different parts of your body to increase awareness",
    icon: Flower,
    category: "Meditation", 
    duration: 600, // 10 minutes
    steps: [
      "Lie down comfortably and close your eyes",
      "Start at the top of your head",
      "Slowly move attention down through your body",
      "Notice any sensations without judgment",
      "Spend 30 seconds on each body part",
      "End at your toes, feeling completely relaxed"
    ]
  }
];

export const WellnessExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const startExercise = (exercise: typeof exercises[0]) => {
    setSelectedExercise(exercise);
    setCurrentStep(0);
    setIsActive(false);
    setTimeLeft(exercise.duration);
  };

  const toggleTimer = () => {
    if (isActive) {
      if (timer) clearInterval(timer);
      setIsActive(false);
    } else {
      setIsActive(true);
      const newTimer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setTimer(newTimer);
    }
  };

  const resetExercise = () => {
    if (timer) clearInterval(timer);
    setIsActive(false);
    setCurrentStep(0);
    setTimeLeft(selectedExercise?.duration || 0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progress = selectedExercise ? 
    ((selectedExercise.duration - timeLeft) / selectedExercise.duration) * 100 : 0;

  if (selectedExercise) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setSelectedExercise(null)}
            className="mb-4"
          >
            ← Back to Exercises
          </Button>
          <h1 className="text-4xl font-bold mb-4">{selectedExercise.title}</h1>
          <p className="text-lg text-muted-foreground">
            {selectedExercise.description}
          </p>
        </div>

        <Card className="bg-gradient-card shadow-wellness">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-wellness-primary">
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex justify-center space-x-4">
              <Button onClick={toggleTimer} size="lg">
                {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {isActive ? 'Pause' : 'Start'}
              </Button>
              <Button onClick={resetExercise} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center mb-6">Exercise Steps</h3>
              <div className="space-y-3">
                {selectedExercise.steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      index === currentStep ? 'bg-wellness-calm border-wellness-primary' : 'bg-muted/30'
                    } transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === currentStep ? 'bg-wellness-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <p className={index === currentStep ? 'font-medium' : 'text-muted-foreground'}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                >
                  Previous Step
                </Button>
                <Button 
                  onClick={() => setCurrentStep(Math.min(selectedExercise.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === selectedExercise.steps.length - 1}
                >
                  Next Step
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Wellness Exercises</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice these evidence-based exercises to manage stress, anxiety, and improve your overall wellbeing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {exercises.map((exercise) => {
          const Icon = exercise.icon;
          return (
            <Card 
              key={exercise.id} 
              className="bg-gradient-card shadow-wellness hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => startExercise(exercise)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Icon className="w-8 h-8 text-wellness-primary" />
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{exercise.category}</div>
                    <div className="text-sm font-medium">{formatTime(exercise.duration)}</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{exercise.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {exercise.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium">What you'll do:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {exercise.steps.slice(0, 3).map((step, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1 h-1 bg-wellness-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                    {exercise.steps.length > 3 && (
                      <li className="text-xs italic">...and {exercise.steps.length - 3} more steps</li>
                    )}
                  </ul>
                </div>
                <Button className="w-full mt-4">
                  Start Exercise
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-wellness-calm/30">
        <CardContent className="pt-6 text-center">
          <Brain className="w-12 h-12 mx-auto text-wellness-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">Tips for Success</h3>
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div>
              <strong>Be Consistent:</strong> Practice regularly for best results
            </div>
            <div>
              <strong>Find Quiet Space:</strong> Choose a comfortable, distraction-free environment
            </div>
            <div>
              <strong>Be Patient:</strong> These techniques improve with practice
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};