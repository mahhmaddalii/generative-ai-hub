"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset email has been sent to your inbox.");
      } else {
        // Show error if account doesn't exist or request fails
        setError(data.error || "No account found with this email.");
      }
    } catch (error) {
      console.error("Forgot Password error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center w-full">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-3">Forgot Password</h3>
      <p className="text-gray-700 mb-6">Enter your registered email</p>

      <div className="text-left mb-4">
        <label htmlFor="email" className="block text-sm text-gray-900 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-5 py-3 text-sm text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200"
        />
      </div>

      {/* Success or Error Messages */}
      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-40 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition mx-auto block"
      >
        Send Reset Link
      </button>

      <p className="text-sm text-gray-900 mt-6">
        Move to login{" "}
        <Link href="/login" className="font-bold text-gray-700 hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  );
}
