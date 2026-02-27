import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

const FloatingAiAssistant: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (chatRef.current && target && !chatRef.current.contains(target)) {
        if (!target.closest('.floating-ai-button')) {
          setIsChatOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-8 z-40">
      {/* Floating 3D Glowing AI Logo */}
      <button
        className={`floating-ai-button relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
          isChatOpen ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          background:
            'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(168,85,247,0.9) 100%)',
          boxShadow:
            '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30" />
        <div className="absolute inset-0 rounded-full border-2 border-white/10" />

        <div className="relative z-10 text-white">
          {isChatOpen ? <X className="w-6 h-6" /> : <Bot className="w-7 h-7" />}
        </div>

        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500" />
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[min(100vw-3rem,420px)] transition-all duration-300 origin-bottom-right"
          style={{
            animation:
              'popInChat 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div className="relative flex flex-col rounded-3xl border border-zinc-600/60 shadow-2xl backdrop-blur-3xl overflow-hidden bg-zinc-950/95">
            {/* Grid background inside chat */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(63,63,70,0.7) 1px, transparent 1px), linear-gradient(to bottom, rgba(63,63,70,0.7) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-6 pt-4 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-medium text-zinc-400">
                  Melissa
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="relative overflow-hidden">
              <textarea
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={4}
                className="w-full px-4 md:px-6 py-4 bg-transparent border-none outline-none resize-none text-sm md:text-base leading-relaxed min-h-[120px] text-zinc-100 placeholder-zinc-500"
                placeholder="Ask Melissa how Fourcee would handle your callers, integrations, or after‑hours coverage…"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(39,39,42,0.15), transparent)',
                }}
              />
            </div>

            {/* Controls Section */}
            <div className="px-3 md:px-4 pb-4">
              <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 p-1 bg-zinc-800/40 rounded-xl border border-zinc-700/50">
                    <button className="group relative p-2 bg-transparent rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 transition-all">
                      <Paperclip className="w-4 h-4" />
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-zinc-900/95 text-zinc-200 text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all border border-zinc-700/50">
                        Upload files
                      </div>
                    </button>
                    <button className="group relative p-2 bg-transparent rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-all">
                      <Link className="w-4 h-4" />
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-zinc-900/95 text-zinc-200 text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all border border-zinc-700/50">
                        Web link
                      </div>
                    </button>
                  </div>
                  <button className="group relative p-2 bg-transparent border border-zinc-700/30 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800/80 transition-all">
                    <Mic className="w-4 h-4" />
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1.5 bg-zinc-900/95 text-zinc-200 text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all border border-zinc-700/50">
                      Voice input
                    </div>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSend}
                    className="relative flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-3 py-2 text-white shadow-lg hover:from-red-500 hover:to-red-400 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-zinc-800/50 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>
                    Press{' '}
                    <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-600 rounded text-zinc-400 font-mono text-[10px] shadow-sm">
                      Shift + Enter
                    </kbd>{' '}
                    for new line
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span>Melissa is listening</span>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(239,68,68,0.08), transparent, rgba(147,51,234,0.08))',
              }}
            />
          </div>
        </div>
      )}

      {/* Keyframes */}
      <style>
        {`
          @keyframes popInChat {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }

          .floating-ai-button:hover {
            transform: scale(1.08) rotate(4deg);
            box-shadow: 0 0 30px rgba(139,92,246,0.9), 0 0 50px rgba(124,58,237,0.7), 0 0 70px rgba(109,40,217,0.5);
          }
        `}
      </style>
    </div>
  );
};

export { FloatingAiAssistant };

