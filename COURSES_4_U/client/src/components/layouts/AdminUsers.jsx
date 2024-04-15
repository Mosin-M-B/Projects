import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// Function to delete a user
const deleteUser = async (id, AuthorizationToken ) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/users/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        },
      }
    );
    const data = await response.json();
    console.log("User After Delete", data); // Update users state after deletion
    toast.success("succesfully Deleted");
  } catch (error) {
    console.log(error);
    alert("Error deleting user. Please try again.");
  }
};

export const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { AuthorizationToken } = useAuth();

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/users",
          {
            method: "GET",
            headers: {
              Authorization: AuthorizationToken,
            },
          }
        );
        const data = await response.json();
        console.log("Users data", data);
        setUsers(data);
        setLoading(false);
        if (response.ok) {
            getAllUserData();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllUserData();
  }, [AuthorizationToken]);

  return (
    <>
      <section className="admin-users-section">
        <div className="container1">
          <h1 className="h1">Admin Users Data</h1>
        </div>
        <div className="container admin-users">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr key="">
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((curUser, index) => {
                    return (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{curUser.username}</td>
                        <td>{curUser.email}</td>
                        <td>{curUser.phone}</td>
                        <td>
                        <Link to={`/admin/users/${curUser._id}/edit`}><button className="btn1">Update</button></Link>
                        </td>
                        <td>
                          <button
                            className="btn third-btn"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you want to delete this user?"
                                )
                              ) {
                                deleteUser(
                                  curUser._id,
                                  AuthorizationToken,
                                );
                              }
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </section>
    </>
  );
};


