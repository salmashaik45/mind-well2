import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Heart, AlertTriangle, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'concerning';
  suggestions?: string[];
}

const predefinedResponses = {
  anxiety: [
    "I understand that anxiety can feel overwhelming. Let's try some grounding techniques together. Can you name 5 things you can see right now?",
    "Anxiety is your body's way of trying to protect you, but sometimes it can be too much. Take a deep breath with me - in for 4, hold for 7, out for 8.",
    "It's completely normal to feel anxious, especially as a student. You're not alone in this. What specific situation is making you feel this way?"
  ],
  stress: [
    "Academic stress is incredibly common. Let's break this down - what's the biggest source of stress for you right now?",
    "Stress can feel like carrying a heavy backpack all day. Let's find ways to lighten that load. Have you tried prioritizing your tasks?",
    "I hear that you're feeling stressed. Remember, it's okay to take breaks. Your mental health is just as important as your studies."
  ],
  depression: [
    "Thank you for sharing something so personal with me. Depression can make everything feel harder, but reaching out shows incredible strength.",
    "I'm concerned about how you're feeling. Depression is a real medical condition, and you deserve support. Have you considered speaking with a counselor?",
    "Your feelings are valid, and you matter. When we're depressed, our thoughts can become very negative. Let's focus on one small thing you can do today."
  ],
  overwhelmed: [
    "Feeling overwhelmed is like trying to drink from a fire hose - everything comes at you at once. Let's slow down and focus on just one thing at a time.",
    "It sounds like you have a lot on your plate right now. Sometimes we need to step back and ask: what's truly urgent versus what feels urgent?",
    "Being overwhelmed often means we're trying to control too many things at once. What's one thing you can delegate or postpone?"
  ],
  loneliness: [
    "Loneliness can be particularly hard in college when everyone seems connected. Your feelings are valid, and you're taking a brave step by reaching out.",
    "Even in a crowd, we can feel alone. Building connections takes time, but it starts with small steps. What's one social activity that interests you?",
    "Loneliness doesn't mean there's something wrong with you. It means you're human and need connection, which is completely normal."
  ],
  default: [
    "Thank you for sharing with me. I'm here to listen and support you through whatever you're experiencing.",
    "It takes courage to reach out for support. How are you feeling right now, and what would be most helpful?",
    "I want you to know that your feelings are valid, and you don't have to go through this alone."
  ]
};

const copingStrategies = {
  anxiety: [
    "Try the 4-7-8 breathing technique",
    "Practice the 5-4-3-2-1 grounding exercise", 
    "Go for a short walk outside",
    "Listen to calming music"
  ],
  stress: [
    "Break large tasks into smaller steps",
    "Take a 10-minute break every hour",
    "Try progressive muscle relaxation",
    "Write down your thoughts"
  ],
  depression: [
    "Reach out to a trusted friend or family member",
    "Engage in a small, enjoyable activity",
    "Get some sunlight or fresh air",
    "Consider professional counseling"
  ],
  overwhelmed: [
    "Create a priority list for today only",
    "Say no to one non-essential commitment",
    "Take three deep breaths",
    "Ask for help with one task"
  ],
  loneliness: [
    "Join a study group or club",
    "Volunteer for a cause you care about",
    "Reach out to an old friend",
    "Attend a campus event"
  ]
};

const crisisKeywords = [
  'suicide', 'kill myself', 'end it all', 'not worth living', 'hurt myself', 
  'self harm', 'cutting', 'overdose', 'die', 'better off dead'
];

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI wellness companion. I'm here to provide emotional support and help you navigate the challenges of student life. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date(),
      sentiment: 'positive'
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const analyzeMessage = (message: string): { category: string; sentiment: 'positive' | 'neutral' | 'concerning'; isCrisis: boolean } => {
    const lowerMessage = message.toLowerCase();
    
    // Check for crisis keywords
    const isCrisis = crisisKeywords.some(keyword => lowerMessage.includes(keyword));
    
    if (isCrisis) {
      return { category: 'crisis', sentiment: 'concerning', isCrisis: true };
    }

    // Categorize based on keywords
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
      return { category: 'anxiety', sentiment: 'concerning', isCrisis: false };
    }
    if (lowerMessage.includes('stressed') || lowerMessage.includes('stress') || lowerMessage.includes('pressure') || lowerMessage.includes('deadline')) {
      return { category: 'stress', sentiment: 'concerning', isCrisis: false };
    }
    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || lowerMessage.includes('hopeless')) {
      return { category: 'depression', sentiment: 'concerning', isCrisis: false };
    }
    if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('too much') || lowerMessage.includes('can\'t handle')) {
      return { category: 'overwhelmed', sentiment: 'concerning', isCrisis: false };
    }
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated') || lowerMessage.includes('no friends')) {
      return { category: 'loneliness', sentiment: 'concerning', isCrisis: false };
    }

    // Positive indicators
    if (lowerMessage.includes('good') || lowerMessage.includes('better') || lowerMessage.includes('happy') || lowerMessage.includes('great')) {
      return { category: 'positive', sentiment: 'positive', isCrisis: false };
    }

    return { category: 'default', sentiment: 'neutral', isCrisis: false };
  };

  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const analysis = analyzeMessage(userMessage);
    
    if (analysis.isCrisis) {
      return {
        content: "I'm very concerned about what you've shared. Your life has value, and there are people who want to help. Please reach out to a crisis helpline immediately - call 988 for the National Suicide Prevention Lifeline or go to your nearest emergency room. You don't have to go through this alone.",
        suggestions: ["Call 988 now", "Go to Crisis Support section", "Contact campus counseling", "Reach out to a trusted friend"]
      };
    }

    const categoryResponses = predefinedResponses[analysis.category as keyof typeof predefinedResponses] || predefinedResponses.default;
    const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    
    const suggestions = analysis.category !== 'positive' && analysis.category !== 'default' 
      ? copingStrategies[analysis.category as keyof typeof copingStrategies] 
      : undefined;

    return { content: response, suggestions };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const { content, suggestions } = generateResponse(userMessage.content);
      const analysis = analyzeMessage(userMessage.content);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content,
        sender: 'ai',
        timestamp: new Date(),
        sentiment: analysis.sentiment,
        suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      if (analysis.isCrisis) {
        toast({
          title: "Crisis Support Needed",
          description: "Please seek immediate help. Your safety is the priority.",
          variant: "destructive",
        });
      }
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickResponse = (response: string) => {
    setInput(response);
  };

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm overwhelmed with coursework", 
    "I'm feeling lonely at university",
    "I'm stressed about my future",
    "I'm having trouble sleeping"
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <MessageCircle className="w-16 h-16 mx-auto text-wellness-primary mb-4" />
        <h1 className="text-4xl font-bold mb-4">AI Wellness Companion</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A safe space to share your thoughts and feelings. Get personalized support, coping strategies, and guidance available 24/7.
        </p>
      </div>

      <Card className="bg-gradient-card shadow-wellness">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-wellness-primary" />
            <span>Chat Support</span>
            <Badge variant="secondary" className="ml-auto">Anonymous & Confidential</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea ref={scrollAreaRef} className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-wellness-primary text-white' : 'bg-wellness-secondary text-white'
                    }`}>
                      {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-wellness-primary text-white' 
                        : message.sentiment === 'concerning' 
                          ? 'bg-wellness-warm/20 border border-wellness-warm' 
                          : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center space-x-1 text-xs opacity-75">
                            <Lightbulb className="w-3 h-3" />
                            <span>Suggestions:</span>
                          </div>
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-auto py-1 px-2 mr-1"
                              onClick={() => handleQuickResponse(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                      <div className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-wellness-secondary text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-wellness-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-wellness-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-wellness-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t space-y-3">
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quick start conversations:</p>
                <div className="flex flex-wrap gap-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-2 px-3"
                      onClick={() => handleQuickResponse(response)}
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Share what's on your mind..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isTyping}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!input.trim() || isTyping}
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-wellness-calm/20 border-wellness-calm">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Heart className="w-6 h-6 text-wellness-primary flex-shrink-0 mt-1" />
            <div className="text-sm">
              <p className="font-medium mb-2">Important Disclaimer</p>
              <p className="text-muted-foreground">
                This AI companion provides emotional support and coping strategies, but it's not a replacement for professional mental health care. 
                If you're experiencing a crisis or persistent mental health concerns, please reach out to a licensed counselor or therapist.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};