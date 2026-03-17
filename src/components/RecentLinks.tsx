import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, History, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export interface LinkRecord {
  id: string;
  phoneNumber: string;
  link: string;
  timestamp: number;
}

interface RecentLinksProps {
  history: LinkRecord[];
  onCopy: (link: string) => void;
}

export function RecentLinks({ history, onCopy }: RecentLinksProps) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <History className="h-4 w-4 text-accent" />
        <h3 className="text-[0.6875rem] font-bold tracking-wide uppercase text-muted">
          Recent Generations
        </h3>
      </div>
      
      <div className="space-y-3">
        {history.map((record) => (
          <div 
            key={record.id}
            className="flex items-center justify-between p-4 bg-white/50 border border-input rounded-[12px] hover:border-accent/30 transition-colors group"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-accent/10 p-2 rounded-full">
                <Phone className="h-3 w-3 text-accent" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {record.phoneNumber}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCopy(record.link)}
              className="text-muted group-hover:text-accent"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
