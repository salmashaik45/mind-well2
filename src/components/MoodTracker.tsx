import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Smile, Meh, Frown, Heart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moods = [
  { id: 1, label: "Very Low", icon: Frown, color: "text-red-500", value: 20 },
  { id: 2, label: "Low", icon: Frown, color: "text-orange-500", value: 40 },
  { id: 3, label: "Neutral", icon: Meh, color: "text-yellow-500", value: 60 },
  { id: 4, label: "Good", icon: Smile, color: "text-green-500", value: 80 },
  { id: 5, label: "Excellent", icon: Smile, color: "text-emerald-500", value: 100 },
];

const factors = [
  "Sleep Quality", "Academic Stress", "Social Connections", "Physical Health", 
  "Financial Concerns", "Family Relationships", "Exercise", "Nutrition"
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor) 
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  const handleSubmit = () => {
    if (!selectedMood) {
      toast({
        title: "Please select your mood",
        description: "We need to know how you're feeling today.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to a database
    toast({
      title: "Mood logged successfully! 🌟",
      description: "Thank you for checking in. Your wellbeing matters.",
    });

    // Reset form
    setSelectedMood(null);
    setSelectedFactors([]);
    setNotes("");
  };

  const selectedMoodData = moods.find(m => m.id === selectedMood);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Daily Mood Check-In</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Take a moment to reflect on how you're feeling today. Regular check-ins help you understand patterns and take better care of your mental health.
        </p>
      </div>

      <Card className="bg-gradient-card shadow-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-wellness-primary" />
            <span>How are you feeling today?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <Button
                  key={mood.id}
                  variant={selectedMood === mood.id ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood.id)}
                  className="flex flex-col items-center space-y-2 h-auto py-6 transition-all duration-300 hover:scale-105"
                >
                  <Icon className={`w-8 h-8 ${selectedMood === mood.id ? 'text-white' : mood.color}`} />
                  <span className="text-sm">{mood.label}</span>
                </Button>
              );
            })}
          </div>

          {selectedMoodData && (
            <div className="text-center p-4 bg-wellness-calm/30 rounded-lg">
              <Progress value={selectedMoodData.value} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                You're feeling {selectedMoodData.label.toLowerCase()} today
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-wellness-accent" />
            <span>What's influencing your mood?</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {factors.map((factor) => (
              <Button
                key={factor}
                variant={selectedFactors.includes(factor) ? "default" : "outline"}
                onClick={() => handleFactorToggle(factor)}
                size="sm"
                className="text-sm transition-all duration-300"
              >
                {factor}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-wellness">
        <CardHeader>
          <CardTitle>Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Share any thoughts, experiences, or goals for today..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={handleSubmit} 
          size="lg"
          className="px-8 py-4 text-lg shadow-wellness hover:shadow-xl transition-all duration-300"
        >
          Log My Mood
        </Button>
      </div>
    </div>
  );
};