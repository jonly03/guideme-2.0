import React, { useState } from "react";
import SharedScreenDisplay from "../SharedScreenDisplay";
import ChatWindow from "../ChatWindow";
import MediaControls from "../MediaControls";

function GuideMeApp() {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [screenStream, setScreenStream] = useState(null);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: crypto.randomUUID(),
      sender: "You", // Replace with actual user data
      text,
      timestamp: Date.now(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleToggleMic = () => {
    setIsMuted((prev) => !prev);
    // In a real app, you'd also mute/unmute the audio track
  };

  const handleToggleVideo = () => {
    setIsVideoMuted((prev) => !prev);
    // In a real app, you'd also enable/disable the video track
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
      <SharedScreenDisplay stream={screenStream} />
      <div className="w-300 bg-secondary border-left border-dark d-flex flex-column">
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
        <MediaControls
          isMuted={isMuted}
          isVideoMuted={isVideoMuted}
          onToggleMic={handleToggleMic}
          onToggleVideo={handleToggleVideo}
          onStartScreenShare={handleStartScreenShare}
          onStopScreenShare={handleStopScreenShare}
          isSharingScreen={isSharingScreen}
        />
      </div>
    </div>
  );
}

export default GuideMeApp;
