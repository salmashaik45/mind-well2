import { useState } from "react";
import { Heart, Brain, Users, Phone, BookOpen, Activity, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodTracker } from "@/components/MoodTracker";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { CrisisSupport } from "@/components/CrisisSupport";
import { WellnessExercises } from "@/components/WellnessExercises";
import { AIChatbot } from "@/components/AIChatbot";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Heart },
    { id: "chat", label: "AI Support", icon: MessageCircle },
    { id: "mood", label: "Mood Check", icon: Activity },
    { id: "resources", label: "Resources", icon: BookOpen },
    { id: "exercises", label: "Exercises", icon: Brain },
    { id: "support", label: "Crisis Support", icon: Phone },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "chat":
        return <AIChatbot />;
      case "mood":
        return <MoodTracker />;
      case "resources":
        return <ResourceLibrary />;
      case "exercises":
        return <WellnessExercises />;
      case "support":
        return <CrisisSupport />;
      default:
        return <HomeContent />;
    }
  };

  const HomeContent = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-hero rounded-3xl text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            A safe, supportive digital space designed specifically for students in higher education. 
            Get 24/7 AI support, track your wellbeing, and access resources when you need them most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setActiveSection("chat")}
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg shadow-wellness hover:shadow-xl transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to AI Support
            </Button>
            <Button 
              onClick={() => setActiveSection("mood")}
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300"
            >
              Track Your Mood
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-4 gap-8">
        <Card className="bg-gradient-card shadow-soft hover:shadow-wellness transition-all duration-300 border-0">
          <CardHeader className="text-center">
            <MessageCircle className="w-12 h-12 mx-auto text-wellness-primary mb-4" />
            <CardTitle className="text-xl">AI Support Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Get instant, personalized emotional support from our AI companion available 24/7
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-wellness transition-all duration-300 border-0">
          <CardHeader className="text-center">
            <Activity className="w-12 h-12 mx-auto text-wellness-primary mb-4" />
            <CardTitle className="text-xl">Daily Mood Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Check in with yourself daily and track patterns in your emotional wellbeing
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-wellness transition-all duration-300 border-0">
          <CardHeader className="text-center">
            <BookOpen className="w-12 h-12 mx-auto text-wellness-secondary mb-4" />
            <CardTitle className="text-xl">Resource Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Access evidence-based articles, videos, and tools for mental health support
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-soft hover:shadow-wellness transition-all duration-300 border-0">
          <CardHeader className="text-center">
            <Brain className="w-12 h-12 mx-auto text-wellness-accent mb-4" />
            <CardTitle className="text-xl">Wellness Exercises</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center">
              Practice mindfulness, breathing exercises, and other wellness techniques
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Statistics */}
      <section className="bg-wellness-calm/30 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Supporting Student Wellbeing</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-wellness-primary mb-2">24/7</div>
            <p className="text-muted-foreground">AI support available</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-wellness-secondary mb-2">60%</div>
            <p className="text-muted-foreground">of students experience anxiety</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-wellness-accent mb-2">40%</div>
            <p className="text-muted-foreground">feel overwhelmed regularly</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-wellness-primary mb-2">100%</div>
            <p className="text-muted-foreground">anonymous and confidential</p>
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-wellness-primary" />
              <span className="text-2xl font-bold bg-gradient-wellness bg-clip-text text-transparent">
                MindWell
              </span>
            </div>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    onClick={() => setActiveSection(item.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                className="flex flex-col items-center space-y-1 h-auto py-2 px-1"
                size="sm"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;