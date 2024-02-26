import { Profile } from "./Profile";
import './profile.css'
export const Parent = () => {
    var profiles = [
        {
          rollNo: 6,
          name: "Prajwal Jagtap",
          age: 19,
          gender: "Male",
          favItCompany: "Wipro India",
          githubUrl: "https://api.github.com/users/PJ9172",
          mailId: "rohitjagtap5000@gmail.com",
          birthDate: "22-06-2004",
          avatar: "https://avatars.githubusercontent.com/u/147252354?v=4",
          profile:"https://github.com/PJ9172"
          
        },
        {
          rollNo: 5,
          name: "Ashwini Yadav",
          age: 21,
          gender: "Female",
          favItCompany: "Tech Mahindra India",
          githubUrl: "https://api.github.com/users/ashwini6777",
          mailId: "ashwiniyadav3703@gmail.com",
          birthDate: "29-01-2003",
          avatar: "https://avatars.githubusercontent.com/u/145981304?v=4",
          profile:"https://github.com/ashwini6777"
          
        },
        {
          rollNo: 4,
          name: "Sanjana Hodbe",
          age: 19,
          gender: "Female",
          favItCompany: "Persistent systems Limited",
          githubUrl: "https://api.github.com/users/SH3422",
          mailId: "sanjanahodbe@gmail.com",
          birthDate: "06-03-2004",
          avatar: "https://avatars.githubusercontent.com/u/147395950?v=4",
        },
        {
          rollNo: 3,
          name: "Farzana Shaikh",
          age: 21,
          gender: "female",
          favItCompany: "Talentica software ",
          githubUrl: "https://api.github.com/users/Fara776",
          mailId: "farashaikh564@gmail.com",
          birthDate: "14-01-2003",
          avatar: "https://avatars.githubusercontent.com/u/145984007?v=4",
          profile:"https://github.com/Fara-776"
          
        },
        {
          rollNo: 2,
          name: "Sharifa Shaikh",
          age: 21,
          gender: "female",
          favItCompany: "Cognizant",
          githubUrl: "https://api.github.com/users/shara762",
          mailId: "shaikhsharifa762@gmail.com",
          birthDate: "14-01-2003",
          avatar: "https://avatars.githubusercontent.com/u/145984673?v=4",
          profile:"https://github.com/shara762"
        },
        {
          rollNo: 1,
          name: "Mosin Balsing",
          age: 19,
          gender: "Male",
          favItCompany: "Tcs",
          githubUrl: "https://api.github.com/users/Mosin-M-B",
          mailId: "mosinbalsing@gmail.com",
          birthDate: "13-03-2004",
          avatar: "https://avatars.githubusercontent.com/u/119176708?v=4",
          profile:"https://github.com/Mosin-M-B"
          
        },];
    return (
        <>
            <div id="main" >
            {profiles.map((ele) => { return <Profile roll={ele.rollNo} name ={ele.name} age={ele.age} avt={ele.avatar} dob={ele.birthDate} fc={ele.favItCompany} email={ele.mailId}/> })}
            </div>
        </>
    );
};
