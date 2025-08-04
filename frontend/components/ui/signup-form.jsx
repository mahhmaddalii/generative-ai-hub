"use client";
import Link from "next/link";
import { useState } from "react";


export default function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! 🎉");
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        alert(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please check the backend or your internet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label text-white">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            autoComplete="given-name"
            className="form-control bg-dark text-white border-secondary"
            id="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label text-white">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            className="form-control bg-dark text-white border-secondary"
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="form-control bg-dark text-white border-secondary"
          id="email"
          placeholder="Enter email"
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
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label text-white">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="form-control bg-dark text-white border-secondary"
          id="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>

      <div className="text-center mt-3">
        <small className="text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-info text-decoration-underline">
            Log in here
          </Link>
        </small>
      </div>
    </form>
  );
}
