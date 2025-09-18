import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Search, Clock, Users } from "lucide-react";

const resourceCategories = [
  "All", "Anxiety", "Depression", "Stress", "Sleep", "Study Tips", "Relationships", "Self Care"
];

const resources = [
  {
    id: 1,
    title: "Managing Academic Stress",
    type: "article",
    category: "Stress",
    readTime: "5 min",
    description: "Learn effective strategies to handle academic pressure and maintain balance.",
    tags: ["stress", "study", "balance"],
    featured: true
  },
  {
    id: 2,
    title: "Breathing Exercises for Anxiety",
    type: "video",
    category: "Anxiety",
    readTime: "8 min",
    description: "Guided breathing techniques to help calm anxiety and reduce panic.",
    tags: ["anxiety", "breathing", "meditation"]
  },
  {
    id: 3,
    title: "Healthy Sleep Habits for Students",
    type: "guide",
    category: "Sleep",
    readTime: "10 min",
    description: "Comprehensive guide to improving sleep quality during university.",
    tags: ["sleep", "health", "routine"],
    featured: true
  },
  {
    id: 4,
    title: "Building Social Connections",
    type: "article",
    category: "Relationships",
    readTime: "7 min",
    description: "Tips for making meaningful friendships and maintaining relationships.",
    tags: ["social", "friendship", "community"]
  },
  {
    id: 5,
    title: "Mindfulness Meditation Basics",
    type: "video",
    category: "Self Care",
    readTime: "12 min",
    description: "Introduction to mindfulness practices for better mental health.",
    tags: ["mindfulness", "meditation", "wellbeing"]
  },
  {
    id: 6,
    title: "Understanding Depression",
    type: "guide",
    category: "Depression",
    readTime: "15 min",
    description: "Comprehensive resource about recognizing and coping with depression.",
    tags: ["depression", "mental health", "support"],
    featured: true
  }
];

export const ResourceLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "guide": return FileText;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-wellness-accent text-white";
      case "guide": return "bg-wellness-secondary text-white";
      default: return "bg-wellness-primary text-white";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Access evidence-based resources, guides, and tools to support your mental health journey.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card shadow-wellness">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className="transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Resources */}
      {selectedCategory === "All" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.filter(r => r.featured).map((resource) => {
              const TypeIcon = getTypeIcon(resource.type);
              return (
                <Card key={resource.id} className="bg-gradient-card shadow-wellness hover:shadow-xl transition-all duration-300 border-2 border-wellness-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className={getTypeColor(resource.type)}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {resource.type}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full">
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {selectedCategory === "All" ? "All Resources" : `${selectedCategory} Resources`}
          <span className="text-lg text-muted-foreground ml-2">
            ({filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'})
          </span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <Card key={resource.id} className="bg-gradient-card shadow-soft hover:shadow-wellness transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className={getTypeColor(resource.type)}>
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {resource.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {resource.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter.
          </p>
        </div>
      )}
    </div>
  );
};