import { useEffect } from "react";
import { useAuth } from "../store/auth";

export const Service = () => {
    const { services } = useAuth();
    
    useEffect(() => {
        console.log(services); // Ensure services are fetched properly
    }, [services]);

    // Check if services is not an array or falsy, then return null or an error message
    if (!Array.isArray(services)) {
        return (
            <section className="section-services">
                <div className="container">
                    <h1 className="main-heading">Services</h1>
                </div>
                <div className="container">
                <h1>Lodding........</h1>
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
    const { provider, price, service: serviceName, description } = service;

    return (
        <div className="card">
            <div className="card-img">
                <img src="/images/design.png" alt="designer" width="200" />
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
