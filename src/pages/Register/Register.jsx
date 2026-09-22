import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get Started
          </p>

          <h1 className="mt-2 text-3xl font-bold">Create Your Account</h1>

          <p className="mt-2 text-sm text-base-content/60">
            Join StudyNook and start booking your study space.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="form-control">
            <span className="mb-2 text-sm font-medium">Name</span>

            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

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
            <span className="mb-2 text-sm font-medium">Photo URL</span>

            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </label>

          <label className="form-control">
            <span className="mb-2 text-sm font-medium">Password</span>

            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
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
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-base-content/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
