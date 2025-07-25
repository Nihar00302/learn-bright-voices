import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceButtonProps {
  onSpeechResult?: (text: string) => void;
  textToSpeak?: string;
  variant?: "listen" | "speak";
  size?: "default" | "lg" | "xl";
}

export const VoiceButton = ({ 
  onSpeechResult, 
  textToSpeak, 
  variant = "listen",
  size = "default" 
}: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice not supported",
        description: "Please use a modern browser with voice support",
        variant: "destructive"
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onSpeechResult?.(transcript);
      toast({
        title: "Voice captured!",
        description: `You said: "${transcript}"`,
      });
    };

    recognition.onerror = () => {
      toast({
        title: "Voice error",
        description: "Could not capture your voice. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = () => {
    if (!textToSpeak) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Speech error",
        description: "Could not read the text aloud",
        variant: "destructive"
      });
    };

    speechSynthesis.speak(utterance);
  };

  if (variant === "speak") {
    return (
      <Button
        variant="accent"
        size={size}
        onClick={speakText}
        disabled={isSpeaking}
        className="animate-pulse-soft"
      >
        <Volume2 className={`${isSpeaking ? 'animate-bounce' : ''}`} />
        {isSpeaking ? "Speaking..." : "Read Aloud"}
      </Button>
    );
  }

  return (
    <Button
      variant={isListening ? "warning" : "secondary"}
      size={size}
      onClick={startListening}
      disabled={isListening}
      className="animate-pulse-soft"
    >
      {isListening ? (
        <MicOff className="animate-pulse" />
      ) : (
        <Mic />
      )}
      {isListening ? "Listening..." : "Speak"}
    </Button>
  );
};