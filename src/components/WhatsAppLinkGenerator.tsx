import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Send, LayoutGrid, Megaphone, BadgeCheck, Settings2, Trash2, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CountryCodePicker } from "./CountryCodePicker";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { LivePreview } from "./LivePreview";
import { RecentLinks, LinkRecord } from "./RecentLinks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const TEMPLATES = [
  { label: "General Inquiry", text: "Hi! I'd like to get more information about your services." },
  { label: "Support", text: "Hello Support Team, I need assistance with..." },
  { label: "Pricing", text: "I'm interested in a quote for..." },
  { label: "Partnership", text: "Hi, I'd like to discuss a potential partnership." },
];

const WhatsAppLinkGenerator = () => {
  const [countryCode, setCountryCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [history, setHistory] = useState<LinkRecord[]>([]);
  
  const { toast } = useToast();

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem("wa_link_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  // Save history helper
  const saveToHistory = (link: string, phone: string) => {
    const newRecord: LinkRecord = {
      id: Math.random().toString(36).substring(7),
      phoneNumber: `+${countryCode} ${phone}`,
      link,
      timestamp: Date.now(),
    };
    const updated = [newRecord, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("wa_link_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("wa_link_history");
    toast({ title: "History Cleared" });
  };

  const generatedLink = useMemo(() => {
    const cleanedNumber = phoneNumber.replace(/[^0-9]/g, "");
    if (!cleanedNumber) return "";

    const waNumber = `${countryCode}${cleanedNumber}`;
    
    // Construct base message
    let finalMessage = message;
    
    // Append UTM tags if present
    const utmTags = [];
    if (utmSource) utmTags.push(`utm_source=${utmSource}`);
    if (utmMedium) utmTags.push(`utm_medium=${utmMedium}`);
    if (utmCampaign) utmTags.push(`utm_campaign=${utmCampaign}`);
    
    if (utmTags.length > 0) {
      const utmString = `\n\n[Ref: ${utmTags.join("&")}]`;
      finalMessage += utmString;
    }

    const encodedMessage = encodeURIComponent(finalMessage);
    let link = `https://wa.me/${waNumber}`;

    if (encodedMessage) {
      link += `?text=${encodedMessage}`;
    }

    return link;
  }, [countryCode, phoneNumber, message, utmSource, utmMedium, utmCampaign]);

  const handleCopy = async (linkToCopy?: string) => {
    const targetLink = linkToCopy || generatedLink;
    if (targetLink) {
      try {
        await navigator.clipboard.writeText(targetLink);
        toast({
          title: "Link Copied!",
          description: "Ready to share.",
        });
        if (!linkToCopy) saveToHistory(targetLink, phoneNumber);
      } catch (err) {
        toast({
          title: "Copy Failed",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpen = () => {
    if (generatedLink) {
      saveToHistory(generatedLink, phoneNumber);
      window.open(generatedLink, "_blank");
    }
  };

  const applyTemplate = (text: string) => {
    setMessage(text);
    toast({ title: "Template Applied" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body text-foreground selection:bg-accent selection:text-white">
      <div className="flex-1 container mx-auto px-6 sm:px-10 py-6 sm:py-8 flex flex-col items-center">
        <div className="w-full max-w-[1340px] space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 max-w-4xl mx-auto">

            <h1 className="font-heading text-3xl sm:text-5xl md:text-[3.25rem] font-extrabold leading-[1.1] tracking-[-0.03em] uppercase">
              WhatsApp <span className="text-accent underline decoration-accent/20 underline-offset-4">Marketing</span> Link Engine
            </h1>
            <p className="text-sm sm:text-base leading-relaxed text-muted max-w-2xl mx-auto px-4">
              Create, track, and brand your WhatsApp direct chat links. The ultimate tool for marketers.
            </p>


          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8 items-start">
            {/* Left Column: Creator */}
            <div className="space-y-6">
              <Card className="bg-card shadow-lg rounded-[20px] border-none overflow-hidden transition-all duration-300">
                <CardContent className="space-y-6 p-6 sm:p-8">
                  {/* Phone Input Row */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-accent" />
                      <label htmlFor="phone" className="text-[0.6875rem] font-bold tracking-wide uppercase text-muted">
                        Recipient Phone Number
                      </label>
                    </div>
                    <div className="flex gap-3 h-12">
                      <CountryCodePicker value={countryCode} onSelect={setCountryCode} />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="234 567 8900"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-white/50 border-input rounded-[8px] focus-visible:ring-accent font-medium text-base px-6 flex-1 h-full"
                      />
                    </div>
                  </div>

                  {/* Message Input with Templates */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Megaphone className="h-4 w-4 text-accent" />
                        <label htmlFor="message" className="text-[0.6875rem] font-bold tracking-wide uppercase text-muted">
                          Pre-filled Message
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {TEMPLATES.map((t) => (
                        <button
                          key={t.label}
                          onClick={() => applyTemplate(t.text)}
                          className="text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-accent/5 hover:bg-accent hover:text-white text-accent transition-all duration-200 border border-accent/10"
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <Textarea
                      id="message"
                      placeholder="Start typing your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="bg-white/50 border-input rounded-[8px] focus-visible:ring-accent font-medium text-base p-5 resize-none min-h-[120px]"
                    />
                  </div>

                  {/* UTM Parameters - Collapsible */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="utm" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2 group">
                        <div className="flex items-center space-x-2 text-[0.6875rem] font-bold tracking-wide uppercase text-muted/60 group-hover:text-accent transition-colors">
                          <Settings2 className="h-4 w-4" />
                          <span>Ad Tracking (UTM)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase text-muted/50">Source</label>
                            <Input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} placeholder="e.g. google" className="h-10 rounded-md text-sm" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase text-muted/50">Medium</label>
                            <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} placeholder="e.g. cpc" className="h-10 rounded-md text-sm" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[0.6rem] font-bold uppercase text-muted/50">Campaign</label>
                            <Input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} placeholder="e.g. summer_sale" className="h-10 rounded-md text-sm" />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Actions */}
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleCopy()}
                      disabled={!generatedLink}
                      variant="outline"
                      className="h-12 border-accent text-accent font-bold rounded-[8px] hover:bg-accent/5 transition-all text-sm uppercase tracking-widest space-x-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Link</span>
                    </Button>
                    <Button
                      onClick={handleOpen}
                      disabled={!generatedLink}
                      className="h-12 bg-accent hover:bg-accent-hover text-white font-bold rounded-[8px] shadow-lg transition-all text-sm uppercase tracking-widest space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Launch Chat</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent History Section */}
              {history.length > 0 && (
                <Card className="bg-card/50 shadow-md rounded-[20px] border-none overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <RecentLinks history={history} onCopy={handleCopy} />
                      <Button variant="ghost" size="sm" onClick={clearHistory} className="text-muted hover:text-destructive space-x-1">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-[0.6rem] font-bold uppercase">Clear</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column: Preview & Assets */}
            <div className="space-y-6 sticky top-6">
              <Card className="bg-card shadow-lg rounded-[20px] border-none overflow-hidden h-fit">
                <CardContent className="p-6 sm:p-8 space-y-8">
                  <LivePreview message={message} />
                  
                  <div className="pt-6 border-t border-input/50">
                    <div className="flex items-center space-x-2 mb-6">
                      <LayoutGrid className="h-4 w-4 text-accent" />
                      <h3 className="text-[0.6875rem] font-bold tracking-wide uppercase text-muted">
                        Asset Generation
                      </h3>
                    </div>
                    <QRCodeGenerator value={generatedLink} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-black py-8 px-6 mt-auto">
        <div className="container mx-auto flex flex-col items-center justify-center max-w-[1340px] text-center">
          <p className="text-[0.75rem] sm:text-[0.875rem] font-medium tracking-wide">
            <span className="text-white/40">Grow your business on WhatsApp with </span>
            <a
              href="https://socialmasla.com/pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors duration-200 font-semibold"
            >
              Pulse by Social Masla
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WhatsAppLinkGenerator;