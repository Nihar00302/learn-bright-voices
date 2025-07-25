import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";
import { Users, BarChart3, LogOut, Star, Trophy, BookOpen, Clock, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  childName: string;
  role: string;
}

interface ChildProgress {
  subject: string;
  level: string;
  progress: number;
  starsEarned: number;
  lastActivity: string;
  timeSpent: number; // in minutes
}

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  // Mock child progress data
  const childProgress: ChildProgress[] = [
    {
      subject: "English",
      level: "Basic",
      progress: 75,
      starsEarned: 12,
      lastActivity: "2 hours ago",
      timeSpent: 45
    },
    {
      subject: "Mathematics",
      level: "Basic", 
      progress: 60,
      starsEarned: 8,
      lastActivity: "1 day ago",
      timeSpent: 30
    },
    {
      subject: "Kannada",
      level: "Basic",
      progress: 40,
      starsEarned: 5,
      lastActivity: "3 days ago",
      timeSpent: 25
    }
  ];

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "parent") {
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600 bg-green-100";
    if (progress >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const welcomeText = `Welcome to your parent dashboard! Here you can track ${user?.childName || "your child"}'s learning progress and achievements.`;

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
            <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍👩‍👧</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {user.name}! 👋
              </h1>
              <p className="text-white/80">
                Tracking {user.childName || "your child"}'s progress
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
          {/* Child Overview */}
          <Card className="mb-8 bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-white/80">Lessons Completed</div>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-white/80">Stars Earned</div>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-white/80">Badges Unlocked</div>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">⏰</div>
                  <div className="text-2xl font-bold">2.5h</div>
                  <div className="text-white/80">Learning Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Card className="shadow-large">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Subject Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {childProgress.map((subject, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{subject.subject}</h4>
                            <p className="text-sm text-muted-foreground">
                              {subject.level} Level
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-accent" />
                              <span className="font-semibold">{subject.starsEarned}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {subject.lastActivity}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className={`px-2 py-1 rounded-full ${getProgressColor(subject.progress)}`}>
                              {subject.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{subject.timeSpent} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span>Level {subject.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Recent Achievements */}
              <Card className="shadow-large">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6" />
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Letter Recognition Master</div>
                        <div className="text-sm text-muted-foreground">
                          Earned 3 stars in English basics
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Counting Champion</div>
                        <div className="text-sm text-muted-foreground">
                          Completed all basic math lessons
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Daily Learner</div>
                        <div className="text-sm text-muted-foreground">
                          3 days of consistent learning
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Recommendations */}
              <Card className="shadow-large">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-6 h-6" />
                    <span>Learning Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <div className="font-semibold mb-1">🎯 Focus on Kannada</div>
                      <div className="text-sm text-muted-foreground">
                        Spend 15 more minutes daily to catch up with other subjects
                      </div>
                    </div>

                    <div className="p-3 bg-primary/20 rounded-lg">
                      <div className="font-semibold mb-1">📖 Ready for Medium Level</div>
                      <div className="text-sm text-muted-foreground">
                        English progress is great! Consider moving to medium difficulty
                      </div>
                    </div>

                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <div className="font-semibold mb-1">🏆 Quiz Challenge</div>
                      <div className="text-sm text-muted-foreground">
                        Take more quizzes to reinforce learning and earn stars
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Support Your Child's Learning
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" size="lg" className="h-16 bg-white">
                  📊 Download Progress Report
                </Button>
                <Button variant="outline" size="lg" className="h-16 bg-white">
                  ⚙️ Adjust Learning Settings
                </Button>
                <Button variant="outline" size="lg" className="h-16 bg-white">
                  💬 Contact Teacher
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;