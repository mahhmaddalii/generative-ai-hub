"use client";
import { useState } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle sending chat message
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, "You: " + userMessage]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:8000/chat/", {
        text: userMessage,
      });
      const aiResponse = res.data.response;
      setMessages((prev) => [...prev, "Bot: " + aiResponse]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, "Bot: Error getting response"]);
    }
  };

  // Handle PDF file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle PDF upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axios.post("http://localhost:8000/upload_document/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message || "File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-gray-800">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">LangChain Chatbot with PDF Upload</h1>

        {/* Messages */}
        <div className="bg-white p-4 rounded shadow space-y-2 h-96 overflow-y-scroll">
          {messages.map((msg, i) => (
            <div key={i} className="whitespace-pre-line">{msg}</div>
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleChatSubmit} className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>

        {/* PDF Upload Section */}
        <div className="flex items-center gap-3">
          {/* File input (hidden) */}
          <input
            type="file"
            accept="application/pdf"
            id="pdf-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* File select button */}
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer flex items-center gap-2 text-red-600"
          >
            <FaFilePdf size={24} />
            {selectedFile ? selectedFile.name : "Select PDF"}
          </label>

          {/* Upload button */}
          <button
            onClick={handleFileUpload}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
