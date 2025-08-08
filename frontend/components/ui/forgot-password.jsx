"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset email sent!");
      } else {
        alert(data.error || "Unable to send reset email.");
      }
    } catch (error) {
      console.error("Forgot Password error:", error);
      alert("Something went wrong.");
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
    </form>
  );
}
