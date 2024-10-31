import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
  //   const { services } = useAuth();
  const [services, setServices] = useState([]);

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("serviec", data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`servicess reeoe from front end ${error}`);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  // Check if services is not an array or falsy, then return null or an error message
  if (!Array.isArray(services)) {
    return (
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Services</h1>
        </div>
        <div className="container">
          <h1>Loading........</h1>
          <p>Error: Unable to fetch services.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service }) => {
  const { provider, price, service: serviceName, description, img } = service;

  return (
    <div className="card">
      <div className="card-img">
        <img src={img} alt="designer" width="200" height="200" />{" "}
        {/* Set fixed height and width for the image */}
      </div>
      <div className="card-details">
        <div className="grid grid-two-cols">
          <p>{provider}</p>
          <p>{price}</p>
        </div>
        <h2>{serviceName}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
