import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";
import { ArrowLeft, Play, Pause, Star, CheckCircle, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Content {
  id: string;
  title: string;
  type: "video" | "audio" | "text";
  url?: string;
  content: string;
  description: string;
}

const LearningContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const subject = searchParams.get("subject");
  const level = searchParams.get("level");
  
  const [currentContent, setCurrentContent] = useState<Content | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Mock content data - in a real app, this would come from an API
  const mockContent: Record<string, Record<string, Content[]>> = {
    english: {
      basic: [
        {
          id: "1",
          title: "Letter A for Apple",
          type: "video",
          url: "https://example.com/video1.mp4",
          content: "Let's learn about the letter A! A is for Apple. Can you say 'Apple'?",
          description: "Introduction to letter A with fun visuals"
        },
        {
          id: "2", 
          title: "Letter B for Ball",
          type: "video",
          url: "https://example.com/video2.mp4",
          content: "Now let's learn B! B is for Ball. Bounce, bounce, ball!",
          description: "Learning letter B through movement"
        }
      ],
      medium: [
        {
          id: "3",
          title: "Simple Words",
          type: "video",
          url: "https://example.com/video3.mp4", 
          content: "Cat, Dog, Sun, Moon. These are simple words you can read!",
          description: "Building vocabulary with common words"
        }
      ],
      hard: [
        {
          id: "4",
          title: "The Little Red Hen Story",
          type: "video",
          url: "https://example.com/video4.mp4",
          content: "Once upon a time, there was a little red hen who found some wheat...",
          description: "Classic story for reading comprehension"
        }
      ]
    },
    math: {
      basic: [
        {
          id: "5",
          title: "Counting 1 to 5",
          type: "video", 
          url: "https://example.com/math1.mp4",
          content: "Let's count together! 1, 2, 3, 4, 5! Show me your fingers as we count!",
          description: "Interactive counting with visual aids"
        }
      ],
      medium: [
        {
          id: "6",
          title: "Adding Fun",
          type: "video",
          url: "https://example.com/math2.mp4", 
          content: "If you have 2 apples and get 1 more, how many do you have? Let's add!",
          description: "Basic addition with real-world examples"
        }
      ]
    },
    kannada: {
      basic: [
        {
          id: "7",
          title: "ಅ ಆ ಇ ಈ (Kannada Vowels)",
          type: "video",
          url: "https://example.com/kannada1.mp4",
          content: "ಅ ಆ ಇ ಈ - ಕನ್ನಡ ಸ್ವರಗಳನ್ನು ಕಲಿಯೋಣ!",
          description: "Learning Kannada vowels with pronunciation"
        }
      ]
    }
  };

  useEffect(() => {
    if (subject && level) {
      const contents = mockContent[subject]?.[level];
      if (contents && contents.length > 0) {
        setCurrentContent(contents[0]);
      }
    }
  }, [subject, level]);

  const handleComplete = () => {
    setCompleted(true);
    toast({
      title: "🎉 Great Job!",
      description: "You've completed this lesson! You earned a star!",
    });
  };

  const handleNextLesson = () => {
    // In a real app, load next content
    toast({
      title: "Next lesson loading...",
      description: "Great progress! Keep learning!",
    });
  };

  const getSubjectEmoji = () => {
    switch (subject) {
      case "english": return "📝";
      case "math": return "🔢";
      case "kannada": return "🌏";
      default: return "📚";
    }
  };

  const getLevelName = () => {
    switch (level) {
      case "basic": return "Basic";
      case "medium": return "Medium"; 
      case "hard": return "Hard";
      default: return "Unknown";
    }
  };

  if (!currentContent) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Loading content...</h2>
            <Button onClick={() => navigate("/learning/subjects")}>
              Back to Subjects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/learning/subjects")}
            className="text-white"
          >
            <ArrowLeft />
          </Button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">
              {getSubjectEmoji()} {subject?.toUpperCase()} - {getLevelName()}
            </h1>
            <p className="text-white/80">{currentContent.title}</p>
          </div>
          <VoiceButton 
            variant="speak" 
            textToSpeak={`${currentContent.title}. ${currentContent.description}`}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Video/Content Player */}
          <Card className="mb-6 shadow-large">
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative">
                {/* Video placeholder - in a real app, this would be a video player */}
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {isPlaying ? (
                      <Pause className="w-12 h-12" />
                    ) : (
                      <Play className="w-12 h-12" />
                    )}
                  </div>
                  <p className="text-lg">Video Content</p>
                  <p className="text-sm text-white/80">Click to {isPlaying ? "pause" : "play"}</p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="absolute inset-0 w-full h-full bg-transparent hover:bg-white/10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{currentContent.title}</h3>
                <p className="text-muted-foreground mb-4">{currentContent.description}</p>
                
                {/* Text content for accessibility */}
                <Card className="bg-muted/50 mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Volume2 className="w-5 h-5" />
                      <span className="font-semibold">Audio Script:</span>
                    </div>
                    <p className="text-lg">{currentContent.content}</p>
                  </CardContent>
                </Card>

                <div className="flex items-center justify-between">
                  <VoiceButton 
                    variant="speak" 
                    textToSpeak={currentContent.content}
                    size="lg"
                  />
                  
                  {!completed ? (
                    <Button 
                      variant="success" 
                      size="lg"
                      onClick={handleComplete}
                    >
                      <CheckCircle className="mr-2" />
                      Mark Complete
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-6 h-6 text-accent fill-current" />
                        <span className="text-lg font-bold">+1 Star!</span>
                      </div>
                      <Button 
                        variant="default" 
                        size="lg"
                        onClick={handleNextLesson}
                      >
                        Next Lesson
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => navigate("/quiz/selection")}
              className="h-16"
            >
              🧠 Take Quiz on This Topic
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/dashboard/student")}
              className="h-16"
            >
              🏠 Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningContent;