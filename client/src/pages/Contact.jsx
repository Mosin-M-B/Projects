import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

export const Contact = () => {
  const { user } = useAuth();
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState(defaultContactFormData);

  // Set initial form data if user is logged in
  useState(() => {
    
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        message: "",
      });
    
  }
}, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const def = {
    username: formData.username,
    email: formData.email,
    message: "",
  };
  const handleContactForm = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData(def);
        const data = await response.json();
        console.log(data);
        alert("Messeg sended!!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Contact Us</h1>
      </div>
      <div className="container grid grid-half-cols">
        <div className="contact-img">
          <img src="/images/support.png" alt="always ready to help you" />
        </div>
        <section className="section-form">
          <form onSubmit={handleContactForm}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInput}
                autoComplete="off"
                required
                cols="30"
                rows="6"
              ></textarea>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};
