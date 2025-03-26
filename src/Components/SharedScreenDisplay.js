import React, { useRef, useEffect } from "react";
import { MonitorPlay } from "lucide-react";

function SharedScreenDisplay({ stream }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);

  return (
    <div className="flex-grow-1 d-flex align-items-center justify-content-center">
      {stream ? (
        <video ref={videoRef} autoPlay playsInline className="w-100 h-100" />
      ) : (
        <div className="text-center">
          <MonitorPlay className="w-12 h-12 mx-auto mb-2" />
          <p>Waiting for screen share...</p>
        </div>
      )}
    </div>
  );
}

export default SharedScreenDisplay;
