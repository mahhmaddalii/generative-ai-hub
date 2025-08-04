'use client';

import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:8000/api/forgot-password/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Password reset link sent to your email.');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">
          Enter your registered email
        </label>
        <input
          type="email"
          className="form-control bg-dark text-white border-secondary"
          id="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Success/Error Message */}
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Submit Button */}
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-sm btn-primary px-4">
          Send Reset Link
        </button>
      </div>

      {/* Back to login */}
      <div className="text-center mt-3">
        <small className="text-white">
          Remember your password?{' '}
          <a href="/login" className="text-info text-decoration-underline">
            Back to login
          </a>
        </small>
      </div>
    </form>
  );
}
