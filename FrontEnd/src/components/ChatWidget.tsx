import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, ArrowUp, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am your plant disease assistant. How can I help you today?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      // Send message to backend
      const response = await fetch('https://cnn-classifier-api-server.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || 'Sorry, I couldn’t process your request.',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: 'Oops! Currently Unavailable. Try again later.',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button onClick={toggleChat} className="h-14 w-14 rounded-full shadow-lg" aria-label={isOpen ? 'Close chat' : 'Open chat'}>
        {isOpen ? <X /> : <MessageCircle />}
      </Button>

      <div
        className={cn(
          'fixed bottom-20 right-4 w-80 sm:w-96 bg-card border border-border rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        )}
      >
        <div className="bg-primary text-primary-foreground p-4">
          <h3 className="font-medium">Plant Disease Assistant</h3>
          <p className="text-xs text-primary-foreground/80">Ask questions about tomato plant diseases</p>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'max-w-[85%] rounded-lg p-3 animate-fade-in',
                msg.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted text-foreground'
              )}
            >
              <p className="text-sm break-words">{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.isUser && <Check className="inline ml-1 h-3 w-3" />}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t bg-card">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <ArrowUp className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
