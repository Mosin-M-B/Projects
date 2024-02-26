import { Outlet, NavLink, Navigate } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { isLoading,user } = useAuth();
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Check if the user is available and is an admin
  const isAdmin = user && user.isAdmin; // Checking if user exists before accessing isAdmin property

  // If user is not available or not an admin, navigate them to the home page
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Render AdminLayout if user is an admin
  return (
    <>
      <header className="main-header">
        <div className="header-container">
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/admin/users" className="nav-link">
                  <FaUsers className="nav-icon" /> Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/contacts" className="nav-link">
                  <GrContact className="nav-icon" /> Contacts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/admin/services" className="nav-link">
                  <FaRegListAlt className="nav-icon" /> Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  <IoHome className="nav-icon" /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
