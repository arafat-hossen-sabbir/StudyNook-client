import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors ${
      isActive
        ? "text-primary"
        : "text-base-content/70 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo-icon.svg"
              alt="StudyNook logo"
              className="h-9 w-9 rounded-xl"
            />

            <span className="text-xl font-bold tracking-tight">StudyNook</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-center hidden md:flex">
          <nav className="flex items-center gap-8">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/rooms" className={navLinkClass}>
              Rooms
            </NavLink>
          </nav>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="navbar-end hidden gap-2 md:flex">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>

          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="navbar-end md:hidden">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Open navigation menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-2 shadow-lg"
            >
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/rooms">Rooms</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>

              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;