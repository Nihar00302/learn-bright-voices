import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";
import { BookOpen, Brain, Star, Settings, LogOut, Play, Trophy, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  age: string;
  disability: string;
  language: string;
  role: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "student") {
        navigate("/");
        return;
      }
      setUser(parsedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast({
      title: "Goodbye!",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  const isVisuallyImpaired = user?.disability === "visual";
  const welcomeText = `Welcome back ${user?.name}! Ready for some fun learning today?`;

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Hello, {user.name}! 👋
              </h1>
              <p className="text-white/80">
                Age: {user.age} | Language: {user.language}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <VoiceButton 
              variant="speak" 
              textToSpeak={welcomeText}
              size="default"
            />
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-8">
            <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h2 className="text-3xl font-bold mb-3">
                  Ready for Adventure?
                </h2>
                <p className="text-xl text-white/90">
                  Choose your learning path below!
                </p>
                {isVisuallyImpaired && (
                  <div className="mt-4 p-3 bg-accent/20 rounded-lg">
                    <Heart className="w-6 h-6 inline mr-2" />
                    <span className="text-lg">Audio-enhanced learning enabled</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Learning Section */}
            <Card className="group hover:shadow-large transition-all duration-300 border-2 hover:border-primary cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  📚 Learning Center
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Explore subjects with videos, stories, and interactive content
                </p>
                
                <div className="space-y-3 mb-6">
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate("/learning/subjects")}
                  >
                    <Play className="mr-2" />
                    Start Learning
                  </Button>
                  
                  <VoiceButton 
                    variant="speak" 
                    textToSpeak="Welcome to the learning center! Here you can explore different subjects through videos and interactive content."
                    size="default"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-semibold">📝 English</div>
                    <div>Stories & Words</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-semibold">🔢 Math</div>
                    <div>Numbers & Counting</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-semibold">🌏 Kannada</div>
                    <div>Local Language</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card className="group hover:shadow-large transition-all duration-300 border-2 hover:border-secondary cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-secondary rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  🧠 Quiz Challenge
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Test your knowledge with fun quizzes and voice interactions
                </p>
                
                <div className="space-y-3 mb-6">
                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="w-full"
                    onClick={() => navigate("/quiz/selection")}
                  >
                    <Trophy className="mr-2" />
                    Take Quiz
                  </Button>
                  
                  <VoiceButton 
                    variant="speak" 
                    textToSpeak="Ready for a quiz challenge? Test your knowledge with voice-enabled questions and earn stars!"
                    size="default"
                  />
                </div>

                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-accent" />
                    <span>Earn Stars</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">🏆</span>
                    <span>Get Badges</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">🎯</span>
                    <span>Track Progress</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Section */}
          <div className="mt-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  🎯 Your Learning Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white/20 rounded-lg">
                    <div className="text-3xl mb-2">📖</div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-white/80">Lessons Completed</div>
                  </div>
                  <div className="p-4 bg-white/20 rounded-lg">
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-white">45</div>
                    <div className="text-white/80">Stars Earned</div>
                  </div>
                  <div className="p-4 bg-white/20 rounded-lg">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-white/80">Badges Unlocked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;