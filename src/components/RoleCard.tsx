import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient: string;
}

export const RoleCard = ({ title, description, icon: Icon, onClick, gradient }: RoleCardProps) => {
  return (
    <Card className="group cursor-pointer hover:shadow-large transition-all duration-300 border-2 hover:border-primary">
      <CardContent className="p-8 text-center">
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${gradient} flex items-center justify-center shadow-medium group-hover:shadow-glow transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 text-lg">{description}</p>
        
        <Button 
          variant="role" 
          size="lg" 
          onClick={onClick}
          className="w-full"
        >
          Select {title}
        </Button>
      </CardContent>
    </Card>
  );
};