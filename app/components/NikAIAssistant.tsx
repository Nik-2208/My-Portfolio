"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './ErrorBoundary';
import { MessageBubble } from './MessageBubble';
import { initRAG, queryRAG } from '../lib/rag';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}



export default function NikAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [status, setStatus] = useState<'init' | 'live' | 'fallback'>('init');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Safe RAG initialization
  useEffect(() => {
    const initializeRAG = async () => {
      try {
        initRAG();
        setStatus('live');
        setIsFallbackMode(false);
        console.log('🧠 NikAI: RAG initialized successfully');
      } catch (error) {
        console.error('🧠 NikAI: RAG init failed, fallback mode:', error);
        setIsFallbackMode(true);
        setStatus('fallback');
      }
    };

    initializeRAG();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Timeout safety
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 5000)
      );

      let aiResponse: string;

      try {
        aiResponse = await Promise.race([queryRAG(userMessage.content), timeoutPromise]);
      } catch (ragError) {
        console.warn('🧠 NikAI RAG failed:', ragError);
        aiResponse = "RAG optimized! Try: skills, projects, experience, or education. 🔧";
        setIsFallbackMode(true);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: aiResponse
      };

      setMessages(prev => [...prev, aiMessage]);
      setStatus(isFallbackMode ? 'fallback' : 'live');
    } catch (error) {
      console.error('🧠 NikAI: Send failed:', error);
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Quick tip: Ask about **skills**, **projects**, **experience** or **education**! 🛠️"
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    setMessages([]);
    setIsFallbackMode(false);
    setStatus('live');
    // Re-init RAG safely
    try {
      initRAG();
    } catch {}
  };

  return (
    <ErrorBoundary fallback={<div className="fixed bottom-6 right-6 bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm">AI Assistant safe</div>}>
      <>
        {/* Toggle Button */}
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-2xl border-2 border-white/20 rounded-2xl flex items-center justify-center text-white text-xl font-bold z-50 backdrop-blur-sm"
          onClick={toggleChat}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          {isOpen ? '✕' : '💬'}
        </motion.button>

        {/* Chat Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed bottom-24 right-6 w-80 max-h-96 bg-black/95 border border-cyan-500/50 backdrop-blur-xl rounded-3xl shadow-2xl z-40 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center text-xs font-bold">
                    🧠
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">NikAI v2.0</h3>
                    <div className="text-xs text-emerald-400 font-mono">
                      🟢 RAG Ready
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="mt-2 text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-black/50">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8 font-mono">
                    Ask about skills, projects, experience...<br/>
                    <span className="text-cyan-400">🧠 Ready!</span>
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
                <div ref={messagesEndRef} />
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 p-3 rounded-2xl border border-cyan-500/30 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-cyan-500/50 border-t-cyan-400 rounded-full animate-spin" />
                        NikAI thinking...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                    placeholder="Ask about skills, projects..."
                    className="flex-1 bg-white/5 border border-white/20 rounded-2xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
                    disabled={isLoading}
                  />
                  <motion.button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 text-white rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg"
                  >
                    {isLoading ? '⏳' : '➤'}
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

