import React, { useState, useRef, useEffect } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Mic, Video, MonitorPlay, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function GuideMeApp() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        sender: "You", // Replace with actual user data
        text: currentMessage,
        timestamp: Date.now(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleToggleMic = () => {
    setIsMuted((prev) => !prev);
  };

  const handleToggleVideo = () => {
    setIsVideoMuted((prev) => !prev);
  };

  const handleStartScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor",
        },
        audio: true,
      });
      setScreenStream(stream);
      setIsSharingScreen(true);
    } catch (error) {
      console.error("Error starting screen share:", error);
      setIsSharingScreen(false);
    }
  };

  const handleStopScreenShare = () => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
    setIsSharingScreen(false);
  };

  return (
    <div className="d-flex vh-100 bg-dark text-white">
      {/* Left: Screen Share Display */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        {screenStream ? (
          <video
            ref={(videoRef) => {
              if (videoRef) videoRef.srcObject = screenStream;
            }}
            autoPlay
            playsInline
            className="w-100 h-100"
          />
        ) : (
          <div className="text-center">
            <MonitorPlay className="w-12 h-12 mx-auto mb-2" />
            <p>Waiting for screen share...</p>
          </div>
        )}
      </div>

      {/* Right: Chat and Controls */}
      <div className="w-300 bg-secondary border-left border-dark d-flex flex-column">
        {/* Chat Window */}
        <div className="flex-grow-1 overflow-auto p-3">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-2 rounded mb-2 ${
                  message.sender === "You"
                    ? "bg-primary text-white ml-auto"
                    : "bg-light text-dark mr-auto"
                }`}
              >
                <p className="mb-0">
                  {message.sender}: {message.text}
                </p>
                <small className="text-right d-block">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </small>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <Form
          onSubmit={handleSendMessage}
          className="p-3 border-top border-dark"
        >
          <FormControl
            as="textarea"
            placeholder="Type your message..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="bg-dark text-white border-dark mb-2"
            rows={3}
          />
          <Button type="submit" className="w-100">
            Send
          </Button>
        </Form>

        {/* Media Controls */}
        <div className="d-flex justify-content-center p-3 border-top border-dark">
          <Button
            onClick={handleToggleMic}
            className={`rounded-circle p-2 mx-2 ${
              isMuted ? "bg-danger" : "bg-dark"
            }`}
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            onClick={handleToggleVideo}
            className={`rounded-circle p-2 mx-2 ${
              isVideoMuted ? "bg-danger" : "bg-dark"
            }`}
          >
            <Video className="w-5 h-5" />
          </Button>
          {isSharingScreen ? (
            <Button onClick={handleStopScreenShare} className="bg-danger mx-2">
              <X className="w-5 h-5" /> Stop Share
            </Button>
          ) : (
            <Button
              onClick={handleStartScreenShare}
              className="bg-primary mx-2"
            >
              <MonitorPlay className="w-5 h-5" /> Share Screen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default GuideMeApp;
