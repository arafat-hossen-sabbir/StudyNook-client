import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { loginUser, googleLogin } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { auth, googleProvider } from "../../config/firebase";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "StudyNook | Login";
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const redirectAfterLogin = () => {
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      setUser(data.user);

      toast.success("Login successful!");

      redirectAfterLogin();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const data = await googleLogin({
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      });

      setUser(data.user);

      toast.success("Login successful!");

      redirectAfterLogin();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Google login failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Welcome Back
          </p>

          <h1 className="mt-2 text-3xl font-bold">Login to StudyNook</h1>

          <p className="mt-2 text-sm text-base-content/60">
            Access your rooms, bookings, and study plans.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="form-control">
            <span className="mb-2 text-sm font-medium">Email</span>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-control">
            <span className="mb-2 text-sm font-medium">Password</span>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && (
            <div className="rounded-lg bg-error/10 p-3 text-sm text-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-base-300"></div>
          <span className="text-sm text-base-content/50">OR</span>
          <div className="h-px flex-1 bg-base-300"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
          disabled={googleLoading}
        >
          {googleLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              <svg className="h-5 w-5" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-6 text-center text-sm text-base-content/60">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
