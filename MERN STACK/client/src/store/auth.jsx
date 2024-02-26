import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(""); // Initialize user state to null
  const [services ,setServices ]=useState("");
  const AuthorizationToken =  `Bearer ${token}`;
  const [isLoading , setIsLoading]=useState(true)
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const logoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken ,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false)
        console.log(data);
      } else {
        console.error("Error fetching user data");
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //------------
  //services 
  //------------
const getServices=async () =>{
  try {
    const response = await  fetch('http://localhost:5000/api/data/service',{
      method:'GET'
    });
    if (response.ok) {
      const data =await response.json()
      console.log("serviec",data.msg);
      setServices(data.msg) 
    }
  } catch (error) {
    console.log(`servicess reeoe from front end ${error}`);
  }
}
  useEffect(() => {
    getServices();
    if (token) {
      getUserData();
    }
  }, [token]); // Fetch user data whenever token changes

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ isLoading,isLoggedIn, storeTokenInLS, logoutUser, user ,services ,AuthorizationToken,getUserData}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

