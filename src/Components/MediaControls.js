import React from "react";
import { Button } from "react-bootstrap";
import { Mic, Video, MonitorPlay, X } from "lucide-react";

function MediaControls({
  isMuted,
  isVideoMuted,
  onToggleMic,
  onToggleVideo,
  onStartScreenShare,
  onStopScreenShare,
  isSharingScreen,
}) {
  return (
    <div className="d-flex justify-content-center p-3 border-top border-dark">
      <Button
        onClick={onToggleMic}
        className={`rounded-circle p-2 mx-2 ${
          isMuted ? "bg-danger" : "bg-dark"
        }`}
      >
        <Mic className="w-5 h-5" />
      </Button>
      <Button
        onClick={onToggleVideo}
        className={`rounded-circle p-2 mx-2 ${
          isVideoMuted ? "bg-danger" : "bg-dark"
        }`}
      >
        <Video className="w-5 h-5" />
      </Button>
      {isSharingScreen ? (
        <Button onClick={onStopScreenShare} className="bg-danger mx-2">
          <X className="w-5 h-5" /> Stop Share
        </Button>
      ) : (
        <Button onClick={onStartScreenShare} className="bg-primary mx-2">
          <MonitorPlay className="w-5 h-5" /> Share Screen
        </Button>
      )}
    </div>
  );
}

export default MediaControls;
