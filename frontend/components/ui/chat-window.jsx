'use client';

export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      <div className="messages-area px-4 py-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-end' : 'text-start'}`}>
            <span className={`badge ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
