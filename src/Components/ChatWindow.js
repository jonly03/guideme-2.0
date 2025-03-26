import React, { useState, useRef, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

function ChatWindow({ messages, onSendMessage }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      onSendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column">
      {/* Message Display Area */}
      <div className="flex-grow-1">
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

      {/* Message Input Area */}
      <Form onSubmit={handleSend} className="p-3 border-top border-dark">
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
    </div>
  );
}

export default ChatWindow;
