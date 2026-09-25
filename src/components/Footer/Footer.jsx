import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-primary">
              StudyNook
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-base-content/60">
              Find and book quiet, comfortable study rooms designed for focused
              learning. Browse available spaces, compare amenities, and reserve
              the room that fits your session.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content/70">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-base-content/60 hover:text-primary"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/rooms"
                  className="text-base-content/60 hover:text-primary"
                >
                  Rooms
                </Link>
              </li>

              <li>
                <Link
                  to="/add-room"
                  className="text-base-content/60 hover:text-primary"
                >
                  Add Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content/70">
              Account
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  to="/login"
                  className="text-base-content/60 hover:text-primary"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-base-content/60 hover:text-primary"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  to="/my-bookings"
                  className="text-base-content/60 hover:text-primary"
                >
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm text-base-content/50">
          © {year} StudyNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
