import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WhatsAppLinkGenerator = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  // Function to clean and format the phone number
  const cleanPhoneNumber = (number: string) => {
    // Remove all non-digit characters
    return number.replace(/[^0-9+]/g, "");
  };

  const generatedLink = useMemo(() => {
    const cleanedNumber = cleanPhoneNumber(phoneNumber);
    if (!cleanedNumber) {
      return "";
    }

    // WhatsApp requires the number to start with the country code, no leading '+' is strictly necessary for wa.me
    // but we'll keep the cleaning simple and rely on the user to input a valid number with country code.
    const waNumber = cleanedNumber.startsWith("+") ? cleanedNumber.substring(1) : cleanedNumber;

    const encodedMessage = encodeURIComponent(message);
    let link = `https://wa.me/${waNumber}`;

    if (encodedMessage) {
      link += `?text=${encodedMessage}`;
    }

    return link;
  }, [phoneNumber, message]);

  const handleCopy = async () => {
    if (generatedLink) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        toast({
          title: "Link Copied!",
          description: "The WhatsApp link has been copied to your clipboard.",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Copy Failed",
          description: "Could not copy the link. Please copy it manually.",
          variant: "destructive",
        });
      }
    }
  };

  const handleOpen = () => {
    if (generatedLink) {
      window.open(generatedLink, "_blank");
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="flex-grow flex items-center justify-center w-full">
        <Card className="w-full max-w-lg shadow-2xl rounded-xl border-t-4 border-green-500">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-800">
            WhatsApp Link Generator
          </CardTitle>
          <p className="text-sm text-gray-500">
            Create a direct link to chat on WhatsApp.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phone Number Input */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium leading-none">
              Phone Number (with country code, e.g., 12345678900)
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="1 234 567 8900"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-lg focus:border-green-500"
            />
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none">
              Pre-filled Message (Optional)
            </label>
            <Textarea
              id="message"
              placeholder="I'd like to know more about..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="rounded-lg focus:border-green-500 resize-none"
            />
          </div>

          {/* Generated Link Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">
              Generated Link
            </label>
            <div className="flex space-x-2">
              <Input
                readOnly
                value={generatedLink || "Enter a phone number to generate link"}
                className="flex-1 rounded-lg bg-gray-100 text-gray-600 truncate"
              />
              <Button
                onClick={handleCopy}
                disabled={!generatedLink}
                className="bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-200"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleOpen}
            disabled={!generatedLink}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>Open WhatsApp Chat</span>
          </Button>
        </CardContent>
      </Card>
      <footer className="mt-8 pb-4 text-center text-sm text-gray-500">
        Powered by{" "}
        <a
          href="https://socialmasla.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold transition-colors duration-200"
          style={{ color: "#F03E3E" }}
        >
          Social Masla
        </a>
      </footer>
    </div>
  );
};

export default WhatsAppLinkGenerator;