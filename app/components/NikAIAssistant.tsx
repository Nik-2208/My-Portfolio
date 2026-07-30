"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Trash2, X, Brain, Bot } from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { MessageBubble } from './MessageBubble';
import { initRAG, queryRAG } from '../lib/rag';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const STARTER_QUESTIONS = [
  "Tell me about Nik",
  "Diploma Score & Merit Rank",
  "Show AI Projects",
  "Work & Internships",
  "Contact Info & Links"
];

let msgIdCounter = 0;
function generateId() {
  msgIdCounter += 1;
  return `msg-${msgIdCounter}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function NikAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // RAG initialization
  useEffect(() => {
    try {
      initRAG();
    } catch (e) {
      console.warn('NikAI: RAG init fallback:', e);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg: Message = {
      id: generateId(),
      role: 'user',
      content: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const fullReply = queryRAG(textToSend);

      // Simulate human-like fast character streaming
      const aiMsgId = generateId();
      setMessages((prev) => [...prev, { id: aiMsgId, role: 'ai', content: '' }]);

      let index = 0;
      const chunkSize = Math.max(2, Math.floor(fullReply.length / 25));
      
      const interval = setInterval(() => {
        index += chunkSize;
        if (index >= fullReply.length) {
          index = fullReply.length;
          clearInterval(interval);
          setIsLoading(false);
        }
        
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId ? { ...msg, content: fullReply.slice(0, index) } : msg
          )
        );
      }, 25);
    } catch (error) {
      console.error('NikAI: Processing error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'ai',
          content: "I'm here! Feel free to ask about my **skills**, **projects**, **education & merit rank**, or **contact details**!",
        },
      ]);
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ErrorBoundary fallback={<div className="fixed bottom-6 right-6 bg-cyan-900/80 text-white px-4 py-2 rounded-xl text-xs font-mono">NikAI Active</div>}>
      <>
        {/* Floating AI Activation Trigger */}
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:brightness-110 shadow-[0_0_30px_rgba(0,255,255,0.35)] border-2 border-white/20 rounded-2xl flex items-center justify-center text-white z-[999] backdrop-blur-md"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Toggle Nik AI Assistant"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7 text-cyan-200" />}
        </motion.button>

        {/* Floating Glassmorphic Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[520px] bg-zinc-950/95 border border-cyan-500/40 backdrop-blur-2xl rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-[998] flex flex-col overflow-hidden"
            >
              {/* Panel Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/15 via-purple-500/15 to-transparent flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                    <Brain className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm font-mono tracking-tight flex items-center gap-2">
                      Nik AI Assistant
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h3>
                    <span className="text-[10px] text-cyan-300 font-mono">
                      Personal Digital Avatar • RAG v2.5
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={clearChat}
                      className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[220px]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-6 px-2 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1 font-mono">Ask me anything about Nik!</h4>
                      <p className="text-zinc-400 text-xs font-sans max-w-xs leading-relaxed">
                        I know Nik&apos;s 97.03% diploma rank, AI projects, EduJR & AICTE internships, skills, and contact info.
                      </p>
                    </div>

                    {/* Starter Question Chips */}
                    <div className="w-full pt-2 flex flex-wrap gap-1.5 justify-center">
                      {STARTER_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-cyan-200 text-xs font-mono transition-all text-left"
                        >
                          ⚡ {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                    >
                      <MessageBubble message={msg} />
                    </motion.div>
                  ))
                )}

                {/* Animated Typing Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 border border-cyan-500/30 text-cyan-200 px-4 py-3 rounded-2xl text-xs font-mono flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                      <span>Nik AI thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/10 bg-black/60">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    placeholder="Ask about skills, projects, rank..."
                    className="flex-1 bg-white/5 border border-white/15 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 text-xs font-sans focus:outline-none transition-colors"
                  />
                  <motion.button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 disabled:opacity-40 text-black font-bold rounded-xl transition-all shadow-md flex items-center justify-center flex-shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 text-black" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </ErrorBoundary>
  );
}
