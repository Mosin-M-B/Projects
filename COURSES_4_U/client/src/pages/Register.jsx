import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to track whether password is visible
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Function to toggle visibility of password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const responseData = await response.json();

      if (response.ok) {
        storeTokenInLS(responseData.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/");
      } else {
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone"
                      value={user.phone}
                      onChange={handleInput}
                      autoComplete="off"
                    />
                  </div>
                  <div className="password-input">
                    <label htmlFor="password">Password</label>
                    <input
                      type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  <br />
                  <button type="submit" className="btns btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
