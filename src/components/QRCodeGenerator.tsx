import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QRCodeGeneratorProps {
  value: string;
}

export function QRCodeGenerator({ value }: QRCodeGeneratorProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { toast } = useToast();

  const downloadQRCode = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 100; // Add padding
      canvas.height = img.height + 150; // Add padding for brand footer
      
      if (ctx) {
        // Background
        ctx.fillStyle = "#F6F4EB";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw QR
        ctx.drawImage(img, 50, 50);
        
        // Brand Text
        ctx.fillStyle = "#121417";
        ctx.font = "bold 24px Inter";
        ctx.textAlign = "center";
        ctx.fillText("WhatsApp Link Generator", canvas.width / 2, canvas.height - 60);
        ctx.font = "16px Inter";
        ctx.fillStyle = "#16a34a";
        ctx.fillText("Powered by Social Masla", canvas.width / 2, canvas.height - 30);
        
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "whatsapp-qr-social-masla.png";
        downloadLink.href = pngFile;
        downloadLink.click();

        toast({
          title: "Downloaded!",
          description: "Your brand-ready QR code is ready.",
        });
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  if (!value) return null;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="bg-white p-6 rounded-[20px] shadow-xl border-4 border-accent/10">
        <QRCodeSVG
          value={value}
          size={200}
          level="H"
          includeMargin={false}
          ref={svgRef}
          fgColor="#121417"
          bgColor="#FFFFFF"
        />
      </div>
      
      <Button
        onClick={downloadQRCode}
        className="bg-background-inverse hover:bg-black text-white rounded-[8px] px-8 py-6 h-auto space-x-2 w-full uppercase tracking-widest font-bold shadow-lg"
      >
        <Download className="h-5 w-5" />
        <span>Download QR PNG</span>
      </Button>

      <p className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-muted text-center max-w-[200px]">
        Scan to instantly start chat
      </p>
    </div>
  );
}
