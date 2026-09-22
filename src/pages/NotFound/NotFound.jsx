import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-7xl font-black text-primary">404</p>

      <h1 className="mt-4 text-3xl font-bold">Page Not Found</h1>

      <p className="mt-3 max-w-md text-base-content/60">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
