import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  MessageCircle,
  X,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Vapi from "@vapi-ai/web";

const VoiceAssistantPlaceholder: React.FC = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const [chatOpen, setChatOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, isSpeaking]);

  useEffect(() => {
    const vapiInstance = new Vapi("a9716cfe-0023-40f0-bf07-c8990d9754d8");
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    });

    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const handleButtonClick = () => {
    if (!vapi) return;

    if (isConnected) {
      vapi.stop();
    } else {
      setTranscript([]);
      vapi.start("6f830557-574a-481f-af43-3691c48d522c");
      setChatOpen(true);
    }
  };

  const handleClearChat = () => {
    setTranscript([]);
  };

  const toggleChatWindow = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Chat Box */}
      {isConnected && chatOpen && (
        <motion.div
          className="w-80 max-h-[26rem] flex flex-col card bg-base-100/90 backdrop-blur-lg border border-base-300 shadow-2xl p-2 overflow-hidden relative"
          style={{
            perspective: "1200px",
          }}
          whileHover={{
            rotateX: 3,
            rotateY: -3,
            scale: 1.02,
            transition: { type: "spring", stiffness: 100, damping: 10 },
          }}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-base-300 bg-primary text-primary-content rounded-t-2xl shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow" />
              <span className="font-semibold text-sm">SCC AI Assistant</span>
              {isSpeaking && (
                <span className="ml-2 text-xs italic animate-pulse">
                  Speaking...
                </span>
              )}
            </div>
            <div className="flex space-x-2 items-center">
              <button
                onClick={handleClearChat}
                className="btn btn-ghost btn-xs text-primary-content hover:text-warning"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button onClick={toggleChatWindow} className="btn btn-ghost btn-xs text-primary-content">
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm text-base-content">
            {transcript.length === 0 ? (
              <p className="text-center text-base-content/60">
                Conversation will appear here...
              </p>
            ) : (
              transcript.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.span
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
                    }}
                    className={`px-3 py-2 rounded-xl max-w-[70%] break-words ${
                      msg.role === "user"
                        ? "bg-primary text-primary-content"
                        : "bg-base-200 text-base-content backdrop-blur-md"
                    } shadow`}
                  >
                    {msg.text}
                  </motion.span>
                </motion.div>
              ))
            )}

            {/* Typing dots */}
            {isSpeaking && (
              <div className="flex justify-start mt-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>
        </motion.div>
      )}

      {/* Expand button */}
      {isConnected && !chatOpen && (
        <motion.button
          onClick={toggleChatWindow}
          className="mb-2 btn btn-primary btn-sm gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronUp className="w-4 h-4" />
          <span>Show Chat</span>
        </motion.button>
      )}

      {/* Voice Assistant Button */}
      <div id="vapi-assistant-widget" className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 1,
          }}
          className="group"
        >
          <motion.button
            onClick={handleButtonClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              y: [0, -5, 0],
              transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
            }}
            className={`btn btn-circle btn-lg ${
              isConnected ? "btn-error" : "btn-primary"
            } shadow-2xl hover:shadow-primary/50 transition-all duration-300 relative overflow-hidden`}
            style={{
              perspective: "800px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* 3D Pulse ring */}
            {isSpeaking && (
              <motion.div
                className="absolute inset-0 border-4 border-primary-content/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            )}

            {/* Icon */}
            {isConnected ? (
              <X className="w-6 h-6 relative z-10" />
            ) : (
              <Mic className="w-7 h-7 relative z-10" />
            )}
          </motion.button>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            whileHover={{ opacity: 1, x: 0, scale: 1 }}
            className="absolute right-16 top-1/2 -translate-y-1/2 tooltip tooltip-left opacity-0 group-hover:opacity-100 transition-all duration-300"
            data-tip={isConnected ? "End Call" : "Start Assistant"}
          >
            <div className="card bg-base-100 border border-base-300 shadow-lg">
              <div className="card-body p-3">
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  {isConnected ? "End Call" : "Start Assistant"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VoiceAssistantPlaceholder;