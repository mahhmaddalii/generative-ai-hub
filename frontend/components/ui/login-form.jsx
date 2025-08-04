"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        // localStorage.setItem("token", data.token); // Optional
        router.push("/chat"); // Optional
      } else {
        alert(data.error || "Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please check your server or internet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="form-control bg-dark text-white border-secondary"
          id="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="form-control bg-dark text-white border-secondary"
          id="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* ✅ Forgot Password link */}
      <div className="text-center mt-3">
        <Link href="/forgot-password" className="text-info text-decoration-underline">
          Forgot password?
        </Link>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
}
