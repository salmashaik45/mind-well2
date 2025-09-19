import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Globe, Clock, AlertTriangle, Heart } from "lucide-react";

const emergencyContacts = [
  {
    name: "KIRAN Mental Health Helpline",
    number: "1800-599-0019",
    description: "24/7 crisis support for suicidal thoughts and mental health emergencies",
    type: "emergency"
  },
  {
    name: "Vandrevala Foundation",
    number: "9999 666 555",
    description: "24/7 crisis helpline providing emotional support",
    type: "support"
  },
  {
    name: "iCall Psychosocial Helpline",
    number: "9152987821",
    description: "Professional counseling and crisis intervention",
    type: "support"
  },
  {
    name: "Campus Counseling Center",
    number: "Contact your institution",
    description: "Your university's counseling services",
    type: "campus"
  }
];

const warningSignsData = [
  "Persistent feelings of sadness or hopelessness",
  "Loss of interest in activities you used to enjoy",
  "Significant changes in sleep or appetite", 
  "Difficulty concentrating or making decisions",
  "Thoughts of death or suicide",
  "Increased use of alcohol or drugs",
  "Withdrawal from friends and family",
  "Extreme mood swings or irritability"
];

const selfCareSteps = [
  "Reach out to someone you trust",
  "Practice deep breathing exercises",
  "Remove means of self-harm from your environment",
  "Create a safety plan with specific coping strategies",
  "Engage in gentle physical activity",
  "Practice grounding techniques (5-4-3-2-1 method)",
  "Avoid alcohol and drugs",
  "Stay connected with support systems"
];

export const CrisisSupport = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <AlertTriangle className="w-16 h-16 mx-auto text-wellness-accent mb-4" />
        <h1 className="text-4xl font-bold mb-4">Crisis Support & Emergency Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          If you're in crisis or having thoughts of self-harm, you're not alone. Help is available 24/7.
        </p>
      </div>

      {/* Emergency Alert */}
      <Card className="border-2 border-red-500 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3 text-red-700">
            <AlertTriangle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">If you are in immediate danger:</h3>
              <p>Call 112 or go to your nearest emergency room immediately.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Contacts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center space-x-2">
          <Phone className="w-6 h-6 text-wellness-primary" />
          <span>Crisis Helplines</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => {
            const getIcon = () => {
              switch (contact.type) {
                case "text": return MessageCircle;
                case "campus": return Globe;
                default: return Phone;
              }
            };
            const Icon = getIcon();
            
            return (
              <Card key={index} className="bg-gradient-card shadow-wellness">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Icon className="w-5 h-5 text-wellness-primary" />
                    <span>{contact.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xl font-bold text-wellness-primary">
                      {contact.number}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {contact.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>Available 24/7</span>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(`tel:${contact.number.replace(/[^\d]/g, '')}`)}
                    >
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-gradient-card shadow-wellness">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-wellness-accent" />
              <span>Warning Signs</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Watch for these signs in yourself or others:
            </p>
            <ul className="space-y-2">
              {warningSignsData.map((sign, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-wellness-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{sign}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-wellness">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-wellness-secondary" />
              <span>Immediate Self-Care Steps</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Things you can do right now to help yourself:
            </p>
            <ul className="space-y-2">
              {selfCareSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-wellness-secondary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Safety Planning */}
      <Card className="bg-wellness-calm/30">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Create Your Safety Plan</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A safety plan is a personalized guide that helps you stay safe during a crisis. 
            It includes warning signs, coping strategies, and emergency contacts.
          </p>
          <Button size="lg" className="shadow-wellness">
            Download Safety Plan Template
          </Button>
        </CardContent>
      </Card>

      {/* Remember */}
      <Card className="bg-gradient-wellness text-white">
        <CardContent className="pt-6 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You Matter</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Crisis situations are temporary. With the right support and treatment, you can feel better. 
            You deserve to live and experience joy again.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};