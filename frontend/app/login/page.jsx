import LoginForm from "../../components/ui/login-form.jsx";

export default function LoginPage() {
  return (
    <main
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundColor: "#020024",
        backgroundImage:
          "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 117, 121, 1) 61%, rgba(0, 242, 255, 1) 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="bg-dark text-white p-4 rounded-4 shadow border border-secondary">
              <div className="d-flex flex-column align-items-center">
                <h2 className="mb-4 fw-bold text-center">Login to AI Hub</h2>
                <LoginForm />
                {/* Signup Redirect */}
                <div className="text-center mt-3">
                  <small className="text-white">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-info text-decoration-underline">
                      Sign up here
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
