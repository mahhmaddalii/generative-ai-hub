"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { API_URL, setTokens, fetchWithAuth, logoutUser } from "../../utils/auth.js";

export default function SignupForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time password match validation
    let newErrors = { ...errors };
    if (name === "confirmPassword" || name === "password") {
      if (name === "confirmPassword" && value !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      } else if (name === "password" && formData.confirmPassword !== value) {
        newErrors.confirmPassword = "Passwords do not match.";
      } else {
        delete newErrors.confirmPassword;
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormMessage({ type: "", text: "" });

    // Final password match check
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
<<<<<<< HEAD
        // ✅ Immediately store JWT tokens after signup
        if (data.access && data.refresh) {
          setTokens({ access: data.access, refresh: data.refresh });
        }

        alert("Registration successful!");
        router.push("/chat"); // redirect after signup
=======
        setFormMessage({
          type: "success",
          text: "✅ Registration successful! You can now log in."
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
>>>>>>> f19996e2b0817d81fbf40874e447246660032f9f
      } else {
        setFormMessage({
          type: "error",
          text: data.error || "❌ Account with this email already exists."
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setFormMessage({
        type: "error",
        text: "❌ Something went wrong. Please try again."
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col text-center w-full">
      <h3 className="text-4xl font-extrabold text-gray-900 mb-3">Sign Up</h3>
      <p className="text-gray-700 mb-6">Create your new account</p>

      {/* First + Last Name */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2 text-left">
          <label htmlFor="firstName" className="block text-sm text-gray-900 mb-1">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-sm bg-gray-100 rounded-xl outline-none focus:bg-gray-200"
          />
        </div>
        <div className="w-1/2 text-left">
          <label htmlFor="lastName" className="block text-sm text-gray-900 mb-1">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 text-sm bg-gray-100 rounded-xl outline-none focus:bg-gray-200"
          />
        </div>
      </div>

      {/* Email */}
      <div className="text-left mb-4">
        <label htmlFor="email" className="block text-sm text-gray-900 mb-1">Email:</label>
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

      {/* Password */}
      <div className="text-left mb-4 relative">
        <label htmlFor="password" className="block text-sm text-gray-900 mb-1">Password:</label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 pr-12 text-sm text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-9 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="text-left mb-4 relative">
        <label htmlFor="confirmPassword" className="block text-sm text-gray-900 mb-1">Confirm Password:</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-5 py-3 pr-12 text-sm text-gray-900 bg-gray-100 rounded-2xl outline-none focus:bg-gray-200"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-9 text-sm text-gray-500"
        >
          {showConfirmPassword ? "Hide" : "Show"}
        </button>

        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-2">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Success or Error Message */}
      {formMessage.text && (
        <p
          className={`text-sm mb-4 ${
            formMessage.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {formMessage.text}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition"
      >
        Sign Up
      </button>

      <p className="text-sm text-gray-900 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-gray-700 hover:underline">Sign In</Link>
      </p>
    </form>
  );
}
