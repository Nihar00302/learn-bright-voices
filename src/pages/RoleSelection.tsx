import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, BookOpen } from "lucide-react";
import { RoleCard } from "@/components/RoleCard";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/VoiceButton";

export type UserRole = "student" | "parent" | "teacher";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles = [
    {
      id: "student" as UserRole,
      title: "Student",
      description: "Join the learning adventure! Perfect for kids aged 5-10.",
      icon: GraduationCap,
      gradient: "bg-gradient-primary"
    },
    {
      id: "parent" as UserRole,
      title: "Parent",
      description: "Track your child's progress and support their learning journey.",
      icon: Users,
      gradient: "bg-gradient-secondary"
    },
    {
      id: "teacher" as UserRole,
      title: "Teacher",
      description: "Upload content and monitor student development.",
      icon: BookOpen,
      gradient: "bg-gradient-accent"
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Navigate to login/signup with role
    navigate(`/auth?role=${role}`);
  };

  const welcomeText = "Welcome to our inclusive learning platform! Choose your role to get started.";

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="p-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-4 animate-bounce-gentle">
            🌟 Learn Together 🌟
          </h1>
          <p className="text-xl text-white/90 mb-6">
            {welcomeText}
          </p>
          <VoiceButton 
            variant="speak" 
            textToSpeak={welcomeText}
            size="lg"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div key={role.id} className="animate-float">
                <RoleCard
                  title={role.title}
                  description={role.description}
                  icon={role.icon}
                  gradient={role.gradient}
                  onClick={() => handleRoleSelect(role.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
              🎯 Designed for Accessibility
            </h3>
            <p className="text-white/90 text-lg">
              Supporting children with visual and cognitive challenges through adaptive learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoleSelection;