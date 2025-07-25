import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";
import { ArrowLeft, BookOpen, Calculator, Globe, Play, Star } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  gradient: string;
  levels: { id: string; name: string; description: string; difficulty: string }[];
}

const LearningSubjects = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const subjects: Subject[] = [
    {
      id: "english",
      name: "English",
      icon: "📝",
      description: "Learn letters, words, and stories in English",
      gradient: "bg-gradient-primary",
      levels: [
        { id: "basic", name: "Basic", description: "Alphabets & Letter Recognition", difficulty: "🟢 Easy" },
        { id: "medium", name: "Medium", description: "Words & Simple Sentences", difficulty: "🟡 Medium" },
        { id: "hard", name: "Hard", description: "Stories & Reading Comprehension", difficulty: "🔴 Advanced" }
      ]
    },
    {
      id: "math",
      name: "Mathematics",
      icon: "🔢",
      description: "Numbers, counting, and basic math operations",
      gradient: "bg-gradient-secondary",
      levels: [
        { id: "basic", name: "Basic", description: "Numbers 1-10 & Counting", difficulty: "🟢 Easy" },
        { id: "medium", name: "Medium", description: "Addition & Subtraction", difficulty: "🟡 Medium" },
        { id: "hard", name: "Hard", description: "Multiplication & Problem Solving", difficulty: "🔴 Advanced" }
      ]
    },
    {
      id: "kannada",
      name: "ಕನ್ನಡ (Kannada)",
      icon: "🌏",
      description: "Learn your local language with fun activities",
      gradient: "bg-gradient-accent",
      levels: [
        { id: "basic", name: "ಮೂಲ (Basic)", description: "ಅಕ್ಷರಗಳು (Letters)", difficulty: "🟢 ಸುಲಭ" },
        { id: "medium", name: "ಮಧ್ಯಮ (Medium)", description: "ಪದಗಳು (Words)", difficulty: "🟡 ಮಧ್ಯಮ" },
        { id: "hard", name: "ಕಠಿಣ (Hard)", description: "ಕಥೆಗಳು (Stories)", difficulty: "🔴 ಕಠಿಣ" }
      ]
    }
  ];

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleLevelSelect = (subjectId: string, levelId: string) => {
    navigate(`/learning/content?subject=${subjectId}&level=${levelId}`);
  };

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedSubject(null)}
              className="text-white"
            >
              <ArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold text-white">
              {selectedSubject.icon} {selectedSubject.name}
            </h1>
            <VoiceButton 
              variant="speak" 
              textToSpeak={`You selected ${selectedSubject.name}. Choose your difficulty level to start learning!`}
            />
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {selectedSubject.levels.map((level) => (
                <Card key={level.id} className="group hover:shadow-large transition-all duration-300 border-2 hover:border-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-12 h-12 ${selectedSubject.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                            {level.id === "basic" ? "1" : level.id === "medium" ? "2" : "3"}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{level.name}</h3>
                            <p className="text-muted-foreground">{level.difficulty}</p>
                          </div>
                        </div>
                        <p className="text-lg mb-4">{level.description}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-accent" />
                          <span className="text-sm text-muted-foreground">
                            Earn up to 3 stars for completing this level
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-3">
                        <Button
                          variant="default"
                          size="lg"
                          onClick={() => handleLevelSelect(selectedSubject.id, level.id)}
                          className="group-hover:scale-105 transition-transform"
                        >
                          <Play className="mr-2" />
                          Start
                        </Button>
                        <VoiceButton 
                          variant="speak" 
                          textToSpeak={`${level.name} level: ${level.description}. Click start to begin!`}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard/student")}
            className="text-white"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold text-white">Choose Your Subject</h1>
          <VoiceButton 
            variant="speak" 
            textToSpeak="Welcome to the learning center! Choose a subject you'd like to explore today."
          />
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card 
                key={subject.id} 
                className="group cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-white"
                onClick={() => handleSubjectSelect(subject)}
              >
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 ${subject.gradient} rounded-2xl flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
                    <span className="text-3xl">{subject.icon}</span>
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6 text-lg">
                    {subject.description}
                  </p>
                  <Button variant="outline" size="lg" className="w-full group-hover:scale-105 transition-transform">
                    <BookOpen className="mr-2" />
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-white/10 backdrop-blur-md border-white/30">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Learning Tips
                </h3>
                <p className="text-white/90 text-lg">
                  Start with Basic level and work your way up. Each level builds on the previous one!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningSubjects;