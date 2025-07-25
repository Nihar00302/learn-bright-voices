import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceButton } from "@/components/VoiceButton";
import { Upload, Users, BookOpen, BarChart3, LogOut, Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  school: string;
  role: string;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    subject: "",
    level: "",
    type: "video",
    description: "",
    file: null as File | null
  });

  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "teacher") {
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadForm({ ...uploadForm, file });
    }
  };

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.subject || !uploadForm.level) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would upload to a server
    toast({
      title: "Content uploaded!",
      description: `${uploadForm.title} has been uploaded successfully`,
    });

    // Reset form
    setUploadForm({
      title: "",
      subject: "",
      level: "",
      type: "video",
      description: "",
      file: null
    });
  };

  const welcomeText = `Welcome to your teacher dashboard, ${user?.name}! Here you can upload content and track student progress.`;

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
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
              <span className="text-2xl">👩‍🏫</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome, {user.name}! 👋
              </h1>
              <p className="text-white/80">
                {user.school} | Teacher Dashboard
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
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Upload Content Section */}
          <div className="space-y-6">
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-6 h-6" />
                  <span>Upload Learning Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitContent} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Content Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Letter A for Apple"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      className="h-12"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select 
                        value={uploadForm.subject} 
                        onValueChange={(value) => setUploadForm({ ...uploadForm, subject: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                          <SelectItem value="kannada">Kannada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="level">Difficulty Level</Label>
                      <Select 
                        value={uploadForm.level} 
                        onValueChange={(value) => setUploadForm({ ...uploadForm, level: value })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Content Type</Label>
                    <Select 
                      value={uploadForm.type} 
                      onValueChange={(value) => setUploadForm({ ...uploadForm, type: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="document">Document/PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the content..."
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                      className="min-h-20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="file">Upload File</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="video/*,audio/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="h-12"
                    />
                  </div>

                  <Button type="submit" variant="default" size="lg" className="w-full">
                    <Plus className="mr-2" />
                    Upload Content
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Stats & Controls */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-6 h-6" />
                  <span>Teaching Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-primary rounded-lg text-white text-center">
                    <div className="text-3xl font-bold">24</div>
                    <div className="text-sm">Content Uploaded</div>
                  </div>
                  <div className="p-4 bg-gradient-secondary rounded-lg text-white text-center">
                    <div className="text-3xl font-bold">156</div>
                    <div className="text-sm">Active Students</div>
                  </div>
                  <div className="p-4 bg-gradient-accent rounded-lg text-white text-center">
                    <div className="text-3xl font-bold">89%</div>
                    <div className="text-sm">Avg Quiz Score</div>
                  </div>
                  <div className="p-4 bg-success rounded-lg text-white text-center">
                    <div className="text-3xl font-bold">342</div>
                    <div className="text-sm">Total Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-6 h-6" />
                  <span>Recent Student Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-semibold">Priya K.</div>
                      <div className="text-sm text-muted-foreground">Completed "Letter A" quiz</div>
                    </div>
                    <div className="text-success font-semibold">95%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-semibold">Arjun S.</div>
                      <div className="text-sm text-muted-foreground">Watched "Counting 1-5" video</div>
                    </div>
                    <div className="text-primary font-semibold">Complete</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-semibold">Meera R.</div>
                      <div className="text-sm text-muted-foreground">Started "Kannada Vowels"</div>
                    </div>
                    <div className="text-warning font-semibold">In Progress</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" size="lg" className="w-full justify-start">
                    <FileText className="mr-2" />
                    Generate Quiz from Content
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start">
                    <BarChart3 className="mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button variant="outline" size="lg" className="w-full justify-start">
                    <Users className="mr-2" />
                    Manage Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;