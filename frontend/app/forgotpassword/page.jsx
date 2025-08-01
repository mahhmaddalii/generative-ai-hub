'use client';

import ForgotPasswordForm from '../../components/ui/forgot-password.jsx';

export default function ForgotPasswordPage() {
  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundColor: '#020024',
        backgroundImage:
          'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 117, 121, 1) 61%, rgba(0, 242, 255, 1) 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="bg-dark text-white p-4 rounded-4 shadow border border-secondary" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h2 className="text-center mb-4 fw-bold">Reset Your Password</h2>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
