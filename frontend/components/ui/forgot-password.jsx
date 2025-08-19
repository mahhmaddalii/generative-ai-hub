"use client";

import { useState } from "react";
import { API_URL, setTokens, fetchWithAuth, logoutUser } from "../../utils/auth.js";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // success message
  const [error, setError] = useState(""); // error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset email sent!");
      } else {
        setError(data.error || "Unable to send reset email.");
      }
    } catch (err) {
      console.error("Forgot Password error:", err);
      setError("Something went wrong.");
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

      <button
        type="submit"
        className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition"
      >
        Send Reset Link
      </button>

      {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
    </form>
  );
}
