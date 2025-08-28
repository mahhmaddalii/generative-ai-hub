// 'use client';
// import { useState, useRef, useEffect } from 'react';

// export default function ChatInput({ onSend }) {
//   const [input, setInput] = useState('');
//   const textareaRef = useRef(null);

//   // Auto-expand textarea height
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
//     }
//   }, [input]);

//   const handleSend = () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;
//     onSend(trimmed);
//     setInput('');
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
    
//     <div className="chat-input-container  bg-white">
//       <div className="input-wrapper d-flex align-items-end w-100">
//         <textarea
//           ref={textareaRef}
//           className="form-control"
//           placeholder="Ask anything"
//           rows={1}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           style={{
//             resize: 'none',
//             overflowY: 'auto',
//             maxHeight: '25vh',
//             border: 'none',
//             boxShadow: 'none',
//             backgroundColor: 'transparent',
//           }}
//         />
//         <button
//           className="btn btn-primary ms-2 d-flex align-items-center justify-content-center"
//           style={{ height: '38px', width: '38px' }}
//           onClick={handleSend}
//         >
//           <i className="bi bi-send" />
//         </button>
//       </div>
//     </div>
    
//   );
// }
