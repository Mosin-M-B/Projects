import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const isAdmin = user?.isAdmin; // Use optional chaining to handle cases where user is null
  
  console.log("Logged in or not: ", isLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">ThapaTechnical</NavLink>
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
