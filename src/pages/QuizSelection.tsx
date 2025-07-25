import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";
import { ArrowLeft, Brain, Star, Trophy, Clock } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  level: string;
  questions: number;
  timeLimit: number;
  description: string;
  emoji: string;
}

const QuizSelection = () => {
  const navigate = useNavigate();

  const availableQuizzes: Quiz[] = [
    {
      id: "english-basic-1",
      title: "Letter Recognition",
      subject: "English",
      level: "Basic",
      questions: 5,
      timeLimit: 10,
      description: "Identify letters A-E with audio support",
      emoji: "🔤"
    },
    {
      id: "english-medium-1", 
      title: "Simple Words",
      subject: "English",
      level: "Medium",
      questions: 7,
      timeLimit: 15,
      description: "Match words to pictures",
      emoji: "📝"
    },
    {
      id: "math-basic-1",
      title: "Counting Quiz",
      subject: "Math", 
      level: "Basic",
      questions: 6,
      timeLimit: 12,
      description: "Count objects from 1 to 10",
      emoji: "🔢"
    },
    {
      id: "math-medium-1",
      title: "Addition Fun",
      subject: "Math",
      level: "Medium", 
      questions: 8,
      timeLimit: 20,
      description: "Simple addition problems",
      emoji: "➕"
    },
    {
      id: "kannada-basic-1",
      title: "ಸ್ವರಗಳು (Vowels)",
      subject: "Kannada",
      level: "Basic",
      questions: 5,
      timeLimit: 10,
      description: "Identify Kannada vowel sounds",
      emoji: "🅰️"
    }
  ];

  const handleStartQuiz = (quiz: Quiz) => {
    navigate(`/quiz/take?id=${quiz.id}`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Basic": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/student")}
            className="text-white"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold text-white">🧠 Quiz Challenge</h1>
          <VoiceButton 
            variant="speak" 
            textToSpeak="Welcome to the quiz challenge! Choose a quiz to test your knowledge and earn stars!"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Card */}
          <Card className="mb-8 bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardContent className="p-6 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold mb-3">Ready for a Challenge?</h2>
              <p className="text-xl text-white/90 mb-4">
                Choose a quiz below and show what you've learned!
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Star className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-sm">Earn Stars</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-sm">Win Badges</div>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-sm">Learn & Grow</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableQuizzes.map((quiz) => (
              <Card key={quiz.id} className="group hover:shadow-large transition-all duration-300 border-2 hover:border-primary">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                    <span className="text-2xl">{quiz.emoji}</span>
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {quiz.title}
                  </CardTitle>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm font-medium">{quiz.subject}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(quiz.level)}`}>
                      {quiz.level}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {quiz.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="p-2 bg-muted rounded-lg">
                      <Brain className="w-4 h-4 mx-auto mb-1" />
                      <div className="font-semibold">{quiz.questions}</div>
                      <div className="text-xs text-muted-foreground">Questions</div>
                    </div>
                    <div className="p-2 bg-muted rounded-lg">
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      <div className="font-semibold">{quiz.timeLimit}</div>
                      <div className="text-xs text-muted-foreground">Minutes</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      variant="default" 
                      size="lg" 
                      className="w-full"
                      onClick={() => handleStartQuiz(quiz)}
                    >
                      Start Quiz
                    </Button>
                    <VoiceButton 
                      variant="speak" 
                      textToSpeak={`${quiz.title}: ${quiz.description}. This quiz has ${quiz.questions} questions and takes ${quiz.timeLimit} minutes.`}
                      size="default"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tips Section */}
          <Card className="mt-8 bg-white/10 backdrop-blur-md border-white/30">
            <CardHeader>
              <CardTitle className="text-white text-center">
                🎯 Quiz Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-center text-white">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-2xl mb-2">🎧</div>
                  <h4 className="font-semibold mb-2">Listen Carefully</h4>
                  <p className="text-sm text-white/80">
                    Use the voice features to hear questions clearly
                  </p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-2xl mb-2">🗣️</div>
                  <h4 className="font-semibold mb-2">Speak Your Answer</h4>
                  <p className="text-sm text-white/80">
                    Use voice input for easy answering
                  </p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-2xl mb-2">⭐</div>
                  <h4 className="font-semibold mb-2">Take Your Time</h4>
                  <p className="text-sm text-white/80">
                    Think before answering to earn more stars
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QuizSelection;