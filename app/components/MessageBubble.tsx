"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp?: string;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (text: string) => {
    const formatted = text
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline hover:text-cyan-300 font-medium">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-xs">$1</code>')
      .replace(/\n/g, '<br/>');

    return formatted;
  };

  return (
    <div className={`group relative max-w-[90%] sm:max-w-[85%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
      message.role === 'ai'
        ? 'bg-gradient-to-br from-zinc-900/90 via-zinc-900/70 to-black text-zinc-200 border border-cyan-500/30 shadow-[0_4px_20px_rgba(0,255,255,0.08)]'
        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-medium border border-cyan-400/50 shadow-md ml-auto'
    }`}>
      {/* Role Badge / Timestamp Header for AI */}
      {message.role === 'ai' && (
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10 text-[10px] font-mono text-cyan-400">
          <span className="font-bold tracking-wider">NIK AI ASSISTANT</span>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white flex items-center gap-1"
            title="Copy message"
          >
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}

      {/* Message Text with HTML/Markdown */}
      <div 
        className="font-sans space-y-1"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
      />
    </div>
  );
}
