import { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import "./AdminServices.css"; // Import CSS file for styling

export const AdminServices = () => {
  const [img, setImg] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [provider, setProvider] = useState("");
  const [allimg, setAllImg] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const imageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = await imageToBase64(file);
      setImg(imageData);
      console.log(imageData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img) {
      try {
        const response = await fetch("http://localhost:5000/api/data/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ img,service , price, description, provider }),
        });
        const data = await response.json();
        console.log(data);
        alert("Image Uploaded Successfully!!!");
        setImg("");
        setService("");
        setPrice("");
        setDescription("");
        setProvider("");
        fetchImages();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service");
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setAllImg(data.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="left-input">
          <label htmlFor="uploadImage" className="box">
            <input
              type="file"
              id="uploadImage"
              name="image"
              onChange={handleUploadImage}
            />
            {img ? <img src={img} alt="" /> : <MdCloudUpload />}
          </label>
        </div>
        <div className="right-input">
          <input
            type="text"
            placeholder="Title"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Creator"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
          <div className="btn">
            <button type="submit">Upload</button>
          </div>
        </div>
      </form>
      <div className="allimg">
        {Array.isArray(allimg) &&
          allimg.map((ele, ind) => (
            <div key={ind} className="singleimg">
              <h2>{ele.title}</h2>
              <img src={ele.img} alt="" width={200} height={150}  />
              <p>Price: ${ele.price}</p>
              <p>Created by:{ele.creator}</p>
              <p>Description:{ele.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
