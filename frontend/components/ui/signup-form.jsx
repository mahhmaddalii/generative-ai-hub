"use client";

import { useState } from "react";
export default function SignupForm() {
  return (
    <form>
      {/* First & Last Name in two columns */}
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
          className="form-control bg-dark text-white border-secondary"
          id="email"
          placeholder="Enter email"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label text-white">
          Password
        </label>
        <input
          type="password"
          className="form-control bg-dark text-white border-secondary"
          id="password"
          placeholder="Create password"
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
          className="form-control bg-dark text-white border-secondary"
          id="confirmPassword"
          placeholder="Confirm password"
          required
          minLength={6}
        />
      </div>

      <div className="d-flex justify-content-center mt-3">
        <button type="button" className="btn btn-primary">
          Sign Up
        </button>
      </div>

      {/* Login Redirect */}
      <div className="text-center mt-3">
        <small className="text-white">
          Already have an account?{" "}
          <a href="/login" className="text-info text-decoration-underline">
            Log in here
          </a>
        </small>
      </div>
    </form>
  );
}
