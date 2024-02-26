import  { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import {toast} from "react-toastify"
export const AdminContacts = () => {
const { AuthorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);
 const  deleteContact=async(id)=>{
  try {
    const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
      method:"DELETE",
      headers:{Authorization:AuthorizationToken},
    })
    toast.success("Deleted!")
  } catch (error) {
    console.log(error);
  }
 }
  useEffect(() => {
    const getContactData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/contacts", {
          method: "GET",
          headers: {
            Authorization: AuthorizationToken
          }
        });

        if (response.ok) {
          getContactData();
         
        }

        const data = await response.json();
        console.log("Contact Data:", data);
        setContactData(data);
      } catch (error) {
        console.error(error);
        // Handle error (e.g., display error message to the user)
      }
    };

    getContactData();
  }, [AuthorizationToken]);

  return (
    <div className="contact-cards">
  {contactData.map((contact, index) =>{
    const {username,email,message,_id}=contact
    return (
      <div key={index} className="contact-card">
      <div className="contact-details">
      <h2>{username}</h2>
      <p>Email: {email}</p>
      <p>Message: {message}</p>
      </div>
      <button className="delete-btn" onClick={()=>deleteContact(_id)}>Delete</button>
      </div>
    )
  })}
</div>

  );
};
