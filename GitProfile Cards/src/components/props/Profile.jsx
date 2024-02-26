import './profile.css'
export const Profile = (props) => {

  return (
    <>
    <center>
      
      <div className="card">
      <div className= "card-img"><img src={props.avt} alt="profile image"/></div>
      <div className ="card-info">
      <p className = "text-title">{props.name}</p>
      <p className = "text-body">{props.dob}</p>
      <p className = "text-body">{props.fc}</p>
      <p className = "text-body">{props.email}</p>
      </div>
      </div>

      
    </center>
    </>
  );
};
