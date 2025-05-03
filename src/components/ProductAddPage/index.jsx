import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const DEFAULT_CATEGORY = "Mobile & Accessories";

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: DEFAULT_CATEGORY,
    stock: "",
    discount: 0,
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["price", "stock", "discount"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { name, description, price, category, stock } = formData;
    if (!name || !description || !price || !category || !stock) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        setMessage("❌ JWT token not found. Please log in again.");
        return;
      }

      setLoading(true);

      await axios.post(
        "https://magictreebackend.onrender.com/products/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Product created successfully!");

      // Reset form state
      setFormData({
        name: "",
        description: "",
        price: "",
        category: DEFAULT_CATEGORY,
        stock: "",
        discount: 0,
      });
      setImages([]);
      setImagePreviews([]);
    } catch (err) {
      console.error(err);
      setMessage(
        err?.response?.data?.message || "❌ Failed to create product."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/");
  };

  return (
    <div className="product-form-container">
      <h1>Create New Product</h1>

      {message && (
        <p
          className="message"
          style={{ color: message.startsWith("✅") ? "green" : "red" }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Mobile & Accessories">Mobile & Accessories</option>
            <option value="Safety & Security">Safety & Security</option>
            <option value="Computers & Laptops">Computers & Laptops</option>
            <option value="TV & Entertainment">TV & Entertainment</option>
            <option value="Cameras & Photography">Cameras & Photography</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Gaming & Accessories">Gaming & Accessories</option>
            <option value="Networking & Accessories">
              Networking & Accessories
            </option>
            <option value="Wearable Technology">Wearable Technology</option>
            <option value="Car Electronics">Car Electronics</option>
          </select>
        </div>

        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Discount (%):</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
          />
        </div>

        <div>
          <label>Images:</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
          />
        </div>

        {imagePreviews.length > 0 && (
          <div className="image-previews">
            <h3>Image Previews:</h3>
            <div className="preview-container">
              {imagePreviews.map((url, index) => (
                <img key={index} src={url} alt={`preview-${index}`} />
              ))}
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProductForm;
