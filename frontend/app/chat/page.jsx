"use client";

import ChatSidebar from "../../components/ui/chat-sidebar";
import ChatWindow from "../../components/ui/chat-window";
import ChatInput from "../../components/ui/chat-input";
import { useState } from "react";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);

    const handleSend = (text) => {
        if (!text.trim()) return;
        setMessages((prev) => [...prev, { role: "user", text }]);
    };

    return (
        <div className="chat-layout">
            
            <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
                <ChatSidebar />
                <div className="chat-main-content">

                    <ChatWindow messages={messages} />
                    <ChatInput onSend={handleSend} />
                    
                </div>
            </div>
        </div>
    );
}
