import React from "react";

interface LivePreviewProps {
  message: string;
}

export function LivePreview({ message }: LivePreviewProps) {
  return (
    <div className="space-y-4">
      <p className="text-[0.6875rem] font-bold tracking-wide uppercase text-muted">
        Live Chat Preview
      </p>
      
      <div className="bg-[#E5DDD5] rounded-[20px] h-[250px] w-full p-6 relative overflow-hidden flex flex-col shadow-inner">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")' }}></div>
        
        <div className="flex-grow flex items-end justify-start">
          <div className="bg-white p-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl shadow-sm max-w-[85%] relative z-10 animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-[1.125rem] leading-[1.6] text-[#121417] break-words">
              {message || "Type a message to see the preview..."}
            </p>
            <div className="flex justify-end mt-1">
              <span className="text-[0.6875rem] text-gray-400">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {/* Bubble Tail */}
            <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
