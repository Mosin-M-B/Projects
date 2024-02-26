import  { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminUpdate = () => {
  const { AuthorizationToken } = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/users/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: AuthorizationToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userDataFromServer = await response.json();
        setUserData(userDataFromServer);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., display error message to the user)
      }
    };

    fetchUserData();
  }, [params.id, AuthorizationToken]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(
            `http://localhost:5000/api/admin/users/update/${params.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: AuthorizationToken,
              },
              body:JSON.stringify(userData)
            },
          );
          if (response.ok) {
            toast.success("Updates Successful")
          }else{
            toast.error("Not Updated Successful")
          }
    } catch (error) {
        // console.log(error);
    }
}

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Update User Data</h1>
      </div>
      <div className="container grid grid-half-cols">
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={userData.username}
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
                value={userData.email}
                onChange={handleInput}
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone"
                value={userData.phone}
                onChange={handleInput}
                autoComplete="off"
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
        <div className="contact-img">
          <img src="/images/support.png" alt="always ready to help you" />
        </div>
      </div>
    </section>
  );
};
