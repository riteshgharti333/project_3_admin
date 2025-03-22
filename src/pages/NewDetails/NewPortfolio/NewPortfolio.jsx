import "./NewPortfolio.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useRef, useState } from "react";
import AddImg from "../../../assets/images/addImg.svg";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const NewPortfolio = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const addPortfolio = async () => {
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await axios.post(
        `${baseUrl}/portfolio/new-portfolio`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success(data.message);
        const portfolioId = data.portfolio?._id;

        if (portfolioId) {
          navigate(`/portfolio`);
        }
      }
    } catch (error) {
      console.error("Error adding portfolio:", error);
      toast.error("Failed to add portfolio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newPortfolio">
      <div className="newPortfolio-top">
        <Link onClick={() => navigate(-1)} className="back-link">
          <h1>
            <RiArrowLeftWideFill className="portfolio-icon" />
            New Portfolio
          </h1>
        </Link>
        <div className="newPortfolio-top-btns">
          <button
            disabled={loading}
            onClick={addPortfolio}
            className="add-portfolio-btn"
          >
            {loading ? "Adding Portfolio..." : "Add Porfolio"}
          </button>
        </div>
      </div>

      <div className="newPortfolio-contents">
        <div className="newPortfolio-contents-top">
          <h1>Portfolio Image</h1>
        </div>

        <div className="newPortfolio-contents-card">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected Portfolio"
              className="portfolio-img"
            />
          ) : (
            <div
              className="add-img-portfolio"
              onClick={handleButtonClick}
              role="button"
              tabIndex={0}
              aria-label="Upload Portfolio Image"
            >
              <img
                src={AddImg}
                alt="Add Portfolio"
                className="add-portfolio-img"
              />
              <p>Add Portfolio Image</p>
            </div>
          )}

          <div className="portfolio-btn">
            <button onClick={handleButtonClick} className="add-image-btn">
              <FaPlus className="change-icon" /> Add Image
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPortfolio;
