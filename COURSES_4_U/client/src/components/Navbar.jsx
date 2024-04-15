import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = user?.isAdmin;
  const location = useLocation();

  // Function to check if current path is "/admin" or its sub-paths
  const isAdminPath = () => {
    return location.pathname.startsWith("/admin");
  };

  // If the current path is "/admin" or its sub-paths, don't render the Navbar
  if (isAdminPath()) {
    return null;
  }

  return (
    <header>
      <div className="containernav">
        <div className="logo-brand">
          <NavLink to="/"><img src="/images/logo.png" alt="" /></NavLink>
        </div>

        <nav>
          <ul>
            <li><NavLink to="/"> Home </NavLink></li>
            <li><NavLink to="/about"> About </NavLink></li>
            <li><NavLink to="/service"> Services </NavLink></li>
            <li><NavLink to="/contact"> Contact </NavLink></li>

            {isLoggedIn ? (
              <>
                {isAdmin ? (
                  <>
                    <li><NavLink to="/admin/users">Admin</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                  </>
                ) : (
                  <li><NavLink to="/logout">Logout</NavLink></li>
                )}
              </>
            ) : (
              <>
                <li><NavLink to="/register"> Register </NavLink></li>
                <li><NavLink to="/login"> Login </NavLink></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
