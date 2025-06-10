import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MessageCircle, X } from 'lucide-react'; // Added X (Close) icon
import Vapi from '@vapi-ai/web'; // Vapi Web SDK

const VoiceAssistantPlaceholder: React.FC = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize Vapi instance on mount
  useEffect(() => {
    const vapiInstance = new Vapi('a9716cfe-0023-40f0-bf07-c8990d9754d8'); // Your Public API Key
    setVapi(vapiInstance);

    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setIsConnected(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on('speech-start', () => {
      console.log('Assistant speaking');
      setIsSpeaking(true);
    });

    vapiInstance.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setIsSpeaking(false);
    });

    // Cleanup on unmount
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  // Button click handler
  const handleButtonClick = () => {
    if (!vapi) return;

    if (isConnected) {
      vapi.stop();
    } else {
      vapi.start('6f830557-574a-481f-af43-3691c48d522c'); // Your Assistant ID
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Assistant Widget */}
      <div id="vapi-assistant-widget" className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          className="group"
        >
          {/* Main Assistant Button */}
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(18, 165, 148, 0.4)',
                '0 0 0 10px rgba(18, 165, 148, 0)',
                '0 0 0 0 rgba(18, 165, 148, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className={`w-14 h-14 ${
              isConnected ? 'bg-red-500' : 'bg-gradient-to-r from-[#12A594] to-teal-600'
            } rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#12A594]/25 transition-all duration-300 relative overflow-hidden`}
          >
            {/* Pulse Animation when speaking */}
            {isSpeaking && (
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              />
            )}

            {/* Icon logic → Mic or Close */}
            {isConnected ? (
              <X className="w-6 h-6 text-white relative z-10" />
            ) : (
              <Mic className="w-6 h-6 text-white relative z-10" />
            )}
          </motion.button>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ opacity: 1, x: 0, scale: 1 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#12A594]" />
              {isConnected ? 'End Call' : 'Start Assistant'}
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white/10 border-r border-b border-white/20 rotate-45"></div>
          </motion.div>

          {/* Status Indicator */}
          <div
            className={`absolute -top-1 -right-1 w-4 h-4 ${
              isConnected ? 'bg-green-500' : 'bg-orange-500'
            } rounded-full border-2 border-white/20 flex items-center justify-center`}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceAssistantPlaceholder;
