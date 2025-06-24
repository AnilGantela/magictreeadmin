import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const DEFAULT_CATEGORY = "Industrial";

const categoryMap = {
  Industrial: [],
  "Security & Safety": ["Biometrics", "CCTV Surveillance"],
  "Eco Friendly": ["Bags", "Chappals", "Clothes"],
  "HR Consultancy": [
    "Internships/Summer Projects",
    "Man Power Planning",
    "Training",
    "Appraisal Systems",
    "Recruitment/Placements",
  ],
  Marketing: [
    "Market Research",
    "Product Selling/Buying",
    "Advertising",
    "Product Design",
    "Product Pricing",
  ],
};

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: DEFAULT_CATEGORY,
    subcategory: "",
    stock: "",
    discount: 0,
    pGst: 18, // ➕ Add default GST
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        subcategory: "", // reset subcategory when category changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: ["price", "stock", "discount", "pGst"].includes(name)
          ? Number(value)
          : value,
      }));
    }
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

    const { name, description, price, category, subcategory, stock, pGst } =
      formData;

    if (!name || !description || !price || !category || !stock || !pGst) {
      setMessage("❌ Please fill in all required fields.");
      return;
    }

    if (categoryMap[category].length > 0 && !subcategory) {
      setMessage("❌ Please select a subcategory.");
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

      setFormData({
        name: "",
        description: "",
        price: "",
        category: DEFAULT_CATEGORY,
        subcategory: "",
        stock: "",
        discount: 0,
        pGst: 18,
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
          <label>Product GST (%):</label>
          <input
            type="number"
            name="pGst"
            value={formData.pGst}
            onChange={handleChange}
            min="0"
            max="28"
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
            {Object.keys(categoryMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {categoryMap[formData.category].length > 0 && (
          <div>
            <label>Subcategory:</label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
            >
              <option value="">-- Select --</option>
              {categoryMap[formData.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

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
