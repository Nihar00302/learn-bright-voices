import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceButton } from "@/components/VoiceButton";
import { ArrowLeft, User, Mail, Lock, Calendar, Heart, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { UserRole } from "./RoleSelection";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const role = searchParams.get("role") as UserRole;
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    disability: "",
    language: "",
    childName: "",
    school: ""
  });

  useEffect(() => {
    if (!role) {
      navigate("/");
    }
  }, [role, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage (in a real app, use proper authentication)
    const userData = {
      ...formData,
      role,
      id: Date.now().toString()
    };
    
    localStorage.setItem("currentUser", JSON.stringify(userData));
    
    toast({
      title: "Welcome!",
      description: `Successfully ${isLogin ? "logged in" : "signed up"} as ${role}`,
    });

    // Navigate based on role
    switch (role) {
      case "student":
        navigate("/dashboard/student");
        break;
      case "parent":
        navigate("/dashboard/parent");
        break;
      case "teacher":
        navigate("/dashboard/teacher");
        break;
      default:
        navigate("/");
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case "student": return "🎓";
      case "parent": return "👨‍👩‍👧";
      case "teacher": return "👩‍🏫";
      default: return "👤";
    }
  };

  const instructionText = `${isLogin ? "Log in" : "Sign up"} as a ${role} to access your personalized learning dashboard.`;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-large border-2 border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-4"
              >
                <ArrowLeft />
              </Button>
              <div className="text-4xl">{getRoleIcon()}</div>
            </div>
            
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Welcome Back!" : "Join Us!"}
            </CardTitle>
            
            <p className="text-muted-foreground">
              {instructionText}
            </p>
            
            <VoiceButton 
              variant="speak" 
              textToSpeak={instructionText}
              size="default"
            />
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-lg h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="text-lg h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="text-lg h-12"
                  required
                />
              </div>

              {/* Role-specific fields */}
              {!isLogin && role === "student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="age">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Age
                    </Label>
                    <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select your age" />
                      </SelectTrigger>
                      <SelectContent>
                        {[5, 6, 7, 8, 9, 10].map((age) => (
                          <SelectItem key={age} value={age.toString()}>
                            {age} years old
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="disability">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Learning Support Needed
                    </Label>
                    <Select value={formData.disability} onValueChange={(value) => setFormData({ ...formData, disability: value })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select support type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visual">Visual Impairment</SelectItem>
                        <SelectItem value="cognitive">Cognitive Support</SelectItem>
                        <SelectItem value="none">No Special Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">
                      <Globe className="w-4 h-4 inline mr-2" />
                      Preferred Language
                    </Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {!isLogin && role === "parent" && (
                <div className="space-y-2">
                  <Label htmlFor="childName">
                    <User className="w-4 h-4 inline mr-2" />
                    Child's Name
                  </Label>
                  <Input
                    id="childName"
                    placeholder="Enter your child's name"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="text-lg h-12"
                  />
                </div>
              )}

              {!isLogin && role === "teacher" && (
                <div className="space-y-2">
                  <Label htmlFor="school">
                    <User className="w-4 h-4 inline mr-2" />
                    School/Institution
                  </Label>
                  <Input
                    id="school"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    className="text-lg h-12"
                  />
                </div>
              )}

              <Button type="submit" variant="default" size="lg" className="w-full">
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;