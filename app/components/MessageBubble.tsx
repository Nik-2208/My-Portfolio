"use client";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div 
      className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
        message.role === 'ai'
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 border border-cyan-500/30'
          : 'bg-white/10 text-white border border-white/20 backdrop-blur-sm'
      }`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
    />
  );
}

