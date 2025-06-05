// components/ChatPopup.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

type Message = {
  sender: string;
  content: string;
  timestamp: number;
};

export default function ChatPopup() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        sender: "You",
        content: message,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        {!open ? (
          <Button onClick={() => setOpen(true)} variant="outline" size="icon">
            <MessageCircle />
          </Button>
        ) : (
          <Card className="w-80 shadow-lg border rounded-lg overflow-hidden flex flex-col h-[400px]">
            <div className="bg-muted p-2 text-sm font-semibold flex justify-between items-center">
              Live Chat
              <button
                className="text-xs px-2 py-1 hover:text-red-500"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
            </div>
            <CardContent className="flex-1 overflow-y-auto p-2 space-y-2 bg-background">
              {messages.map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-semibold">{msg.sender}: </span>
                  <span>{msg.content}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
            <div className="p-2 border-t flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
