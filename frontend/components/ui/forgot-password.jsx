'use client';

export default function ForgotPasswordForm() {
  return (
    <form>
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
        />
      </div>

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
