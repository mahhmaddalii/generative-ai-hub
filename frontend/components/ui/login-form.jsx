"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful! Redirecting...");
        setTimeout(() => router.push("/chat"), 1500);
      } else {
        setError(data.error || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col text-center w-full">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-3">Sign In</h3>
        <p className="text-gray-700 mb-6">Enter your email and password</p>

        <a
          href="#"
          className="flex items-center justify-center w-full py-3 mb-6 text-sm font-medium text-gray-900 bg-gray-200 rounded-2xl hover:bg-gray-300 transition"
        >
          <img src="/logo-google.png" alt="Google" className="h-5 mr-2" />
          Continue with Google
        </a>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-left mb-4">
          <label htmlFor="email" className="block text-sm text-gray-900 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 text-sm text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200"
          />
        </div>

        <div className="text-left mb-4 relative">
          <label htmlFor="password" className="block text-sm text-gray-900 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 pr-12 text-sm text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-9 right-4 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Success or Error Messages */}
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-purple-600" />
            <span className="text-gray-900">Keep me logged in</span>
          </label>
          <Link href="/forgotpassword" className="text-purple-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition"
        >
          Sign In
        </button>

        <p className="text-sm text-gray-900 mt-6">
          Not registered yet?{" "}
          <Link href="/signup" className="font-bold text-gray-700 hover:underline">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
}
