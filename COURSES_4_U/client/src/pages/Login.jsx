import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("after login: ", responseData);
        toast.success("Login Successful");
        storeTokenInLS(responseData.token);
        navigate("/");
      } else {
        toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to toggle visibility of password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
            <div className="registration-form">
              <h1 className="main-heading mb-3">Login form</h1>
              <br />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
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
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
