import "./NewHomeBanner.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState, useRef, useCallback } from "react";
import addImg from "../../../assets/images/addImg.svg";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";
import axios from "axios";

const NewHomeBanner = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [banners, setBanners] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  }, []);

  // Open file input
  const handleClick = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  // Add banner details WITHOUT uploading to Cloudinary
  const handleAddBanner = useCallback(() => {
    if (!file || !title || !desc) {
      toast.error("Please fill all fields before adding.");
      return;
    }

    const newBanner = { image, file, title, desc }; // Store local image & file
    setBanners((prev) => [...prev, newBanner]);
    setImage(null);
    setFile(null);
    setTitle("");
    setDesc("");
  }, [file, title, desc, image]);

  // Remove banner
  const handleRemoveBanner = useCallback((index) => {
    setBanners((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Upload all images to Cloudinary & save banners to DB
  const handleSaveToDatabase = useCallback(async () => {
    if (!bannerTitle || banners.length === 0) {
      toast.error("Please add a banner title and at least one banner.");
      return;
    }

    setLoading(true);

    try {
      const uploadedBanners = await Promise.all(
        banners.map(async (banner) => {
          const formData = new FormData();
          formData.append("file", banner.file);
          formData.append("upload_preset", "tk-site");
          formData.append("cloud_name", "ddmucrojh");
          formData.append("folder", "tk-site");

          const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/ddmucrojh/image/upload`,
            formData
          );

          return {
            image: data.secure_url, // Use Cloudinary URL
            title: banner.title,
            desc: banner.desc,
          };
        })
      );

      // Save to database
      const response = await axios.post(
        `${baseUrl}/home-banner/new-home-banner`,
        {
          bannerTitle,
          bannerDetails: uploadedBanners,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        const newBannerId = response.data.homeBanner?._id;

        if (newBannerId) {
          navigate(`/home-banner/${newBannerId}`);
        }
      }
    } catch (error) {
      console.error("Error saving banners:", error);
      toast.error("Failed to save banners.");
    } finally {
      setLoading(false);
    }
  }, [bannerTitle, banners]);

  return (
    <div className="newHomeBanner">
      {/* Top Section */}
      <div className="newHomeBanner-top">
        <Link onClick={() => navigate(-1)} className="back-link">
          <h1>
            <RiArrowLeftWideFill className="newHomeBanner-icon" />
            New Home Banner
          </h1>
        </Link>

        <div className="newHomeBanner-top-btns">
          <button
            onClick={handleSaveToDatabase}
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Adding Banners..." : "Add Banners"}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="newHomeBanner-content">
        {/* Banner Title Input */}
        <div className="newHomeBanner-content-top">
          <label htmlFor="bannerTitle">Banner Title:</label>
          <input
            id="bannerTitle"
            type="text"
            placeholder="Add Banner Title...."
            value={bannerTitle}
            onChange={(e) => setBannerTitle(e.target.value)}
          />
        </div>

        {/* Display Added Banners */}
        <div className="added-banners">
          {banners.map((banner, index) => (
            <div key={index} className="banner-item">
              <img src={banner.image} alt="Banner" className="banner-thumb" />
              <div className="banner-details">
                <h4>
                  <span>Banner Image Title : </span>
                  {banner.title}
                </h4>
                <p>
                  <span>Banner Image Description : </span>
                  {banner.desc}
                </p>
              </div>

              <div className="added-banners-btn">
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveBanner(index)}
                  aria-label="Delete Banner"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Details Section */}
        <div className="newHomeBanner-content-details">
          <div className="newHomeBanner-content-details-card">
            {/* Image Upload Section */}
            <div
              className={`newHomeBanner-content-details-left ${
                image ? "bg-none" : ""
              }`}
              onClick={handleClick}
              role="button"
              tabIndex={0}
              aria-label="Upload Banner Image"
            >
              {image ? (
                <img src={image} className="main-image" alt="Selected Banner" />
              ) : (
                <>
                  <img src={addImg} alt="Add Banner" className="addimage" />
                  <p>Add Banner Image</p>
                </>
              )}

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            {/* Right Side Inputs */}
            <div className="newHomeBanner-content-details-right">
              <div className="newHomeBanner-content-details-right-inputs">
                <label htmlFor="imageTitle">Banner Image Title:</label>
                <input
                  id="imageTitle"
                  type="text"
                  placeholder="Add Banner Image Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="newHomeBanner-content-details-right-inputs desc-area">
                <label htmlFor="imageDesc">Banner Image Description:</label>
                <textarea
                  id="imageDesc"
                  className="text-area"
                  placeholder="Add Banner Image Description..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="banner-add-btn">
                <button onClick={handleAddBanner} className="image-add-btn">
                  <FaPlus className="add-icon" /> Add Banner Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHomeBanner;
