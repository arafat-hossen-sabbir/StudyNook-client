import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logoutUser } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-primary" : "text-base-content/70 hover:text-primary"
    }`;

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-primary">
            StudyNook
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center gap-7">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/rooms" className={navLinkClass}>
              Rooms
            </NavLink>

            {user && (
              <>
                <NavLink to="/add-room" className={navLinkClass}>
                  Add Room
                </NavLink>

                <NavLink to="/my-listings" className={navLinkClass}>
                  My Listings
                </NavLink>

                <NavLink to="/my-bookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              </>
            )}
          </nav>
        </div>

        <div className="navbar-end gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost hidden sm:inline-flex">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                <div className="avatar">
                  <div className="w-9 rounded-full">
                    <img
                      src={
                        user.photoURL || "https://ui-avatars.com/api/?name=User"
                      }
                      alt={user.name || "User"}
                    />
                  </div>
                </div>

                <span className="hidden sm:inline">{user.name || "User"}</span>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[50] mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow"
              >
                <li>
                  <Link to="/my-bookings">My Bookings</Link>
                </li>

                <li>
                  <Link to="/my-listings">My Listings</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
