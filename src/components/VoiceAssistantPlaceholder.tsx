import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MessageCircle } from 'lucide-react';

const VoiceAssistantPlaceholder: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Voice Assistant Widget Placeholder - This is where Vapi.ai integration will be added */}
      <div id="vapi-assistant-widget" className="relative">
        {/* Placeholder UI for demonstration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            delay: 1 
          }}
          className="group"
        >
          {/* Main Assistant Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(18, 165, 148, 0.4)",
                "0 0 0 10px rgba(18, 165, 148, 0)",
                "0 0 0 0 rgba(18, 165, 148, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="w-14 h-14 bg-gradient-to-r from-[#12A594] to-teal-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl hover:shadow-[#12A594]/25 transition-all duration-300 relative overflow-hidden"
          >
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
            
            <Mic className="w-6 h-6 text-white relative z-10" />
          </motion.button>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ opacity: 1, x: 0, scale: 1 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#12A594]" />
              AI Assistant (Coming Soon)
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-white/10 border-r border-b border-white/20 rotate-45"></div>
          </motion.div>

          {/* Status Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </motion.div>

        {/* Developer Note - Remove this in production */}
        <div className="absolute bottom-16 right-0 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-yellow-300 text-xs max-w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <strong>Developer Note:</strong> This is a placeholder for the Vapi.ai voice assistant integration. 
          The actual VapiWidget component will be integrated here using the @vapi-ai/web SDK.
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistantPlaceholder;