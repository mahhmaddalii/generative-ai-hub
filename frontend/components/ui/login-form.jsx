"use client";

import Link from 'next/link'

export default function LoginForm() {
  return (
    <form className="w-100">
      {/* Email Field */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">
          Email address
        </label>
        <input
          type="email"
          className="form-control bg-dark text-white border-secondary"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">
          Password
        </label>
        <input
          type="password"
          className="form-control bg-dark text-white border-secondary"
          id="password"
          placeholder="Enter password"
          required
          minLength={6}
        />
      </div>

      {/* Forgot Password Link */}
      <div className="d-flex justify-content-center">
        <Link
          href="/forgotpassword"
          className="text-info text-decoration-underline small"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-sm btn-primary px-4">
          Login
        </button>
      </div>
    </form>
  );
}
