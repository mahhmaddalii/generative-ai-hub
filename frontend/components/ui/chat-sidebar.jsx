'use client';
import { useState } from 'react';
import '../../styles/global.css'; // Adjust if needed

export default function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar d-flex flex-column ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      
      {/* Top: Logo and toggle */}
      <div className="sidebar-header px-3 pt-3">
        {isOpen ? (
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">MyApp</span>
            <button className="btn btn-sm" onClick={() => setIsOpen(false)}>
              <i className="bi bi-chevron-left"></i>
            </button>
          </div>
        ) : (
          <button className="btn btn-light icon-btn" onClick={() => setIsOpen(true)}>
            <i className="bi bi-lightning fs-5"></i>
          </button>
        )}
      </div>

      {/* Middle: Navigation */}
      <div className="sidebar-nav mt-4 px-2 flex-grow-1">
        <ul className="list-unstyled">
          <li className="mb-2 text-center text-md-start">
            <button className="sidebar-btn w-100">
              <i className="bi bi-plus-lg fs-5"></i>
              {isOpen && <span className="ms-2">New Chat</span>}
            </button>
          </li>
          <li className="text-center text-md-start">
            <button className="sidebar-btn w-100">
              <i className="bi bi-robot fs-5"></i>
              {isOpen && <span className="ms-2">AI Agents</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Bottom: Profile */}
      <div className="sidebar-footer p-3 text-center text-md-start">
        <button className="sidebar-btn w-100" onClick={() => setIsOpen(!isOpen)}>
          <i className="bi bi-person-circle fs-5"></i>
          {isOpen && <span className="ms-2">Profile</span>}
        </button>
      </div>
    </div>
  );
}
