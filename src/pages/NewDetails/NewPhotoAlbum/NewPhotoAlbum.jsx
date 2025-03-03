import "./NewPhotoAlbum.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useState, useRef, useCallback } from "react";
import addImg from "../../../assets/images/addImg.svg";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";
import axios from "axios";

const NewPhotoAlbum = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [photoAlbums, setPhotoAlbums] = useState([]);
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

  // Add photo album image without uploading
  const handleAddPhoto = useCallback(() => {
    if (!file) {
      toast.error("Please add images before adding.");
      return;
    }

    const newPhoto = { image, file };
    setPhotoAlbums((prev) => [...prev, newPhoto]);
    setImage(null);
    setFile(null);
  }, [file, image]);

  // Remove photo from album
  const handleRemovePhoto = useCallback((index) => {
    setPhotoAlbums((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Upload all images to Cloudinary & save to database
  const handleSaveToDatabase = useCallback(async () => {
    if (photoAlbums.length === 0) {
      toast.error("Please add at least one photo before saving.");
      return;
    }

    setLoading(true);

    try {
      const uploadedPhotos = await Promise.all(
        photoAlbums.map(async (photo) => {
          const formData = new FormData();
          formData.append("file", photo.file);
          formData.append("upload_preset", "tk-site");
          formData.append("cloud_name", "ddmucrojh");
          formData.append("folder", "tk-production-images/photoAlbum");

          const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/ddmucrojh/image/upload`,
            formData
          );

          return data.secure_url;
        })
      );

      // Save to database
      const response = await axios.post(
        `${baseUrl}/photoAlbum/new-photo-album`,
        {
          images: uploadedPhotos,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        const newAlbumId = response.data.album._id;
        if (newAlbumId) {
          navigate(`/photoAlbum/${newAlbumId}`);
        }
      }
    } catch (error) {
      console.error("Error saving photo album:", error);
      toast.error("Failed to save photo album.");
    } finally {
      setLoading(false);
    }
  }, [photoAlbums, navigate]);

  return (
    <div className="newPhotoAlbum">
      {/* Top Section */}
      <div className="newPhotoAlbum-top">
        <Link onClick={() => navigate(-1)} className="back-link">
          <h1>
            <RiArrowLeftWideFill className="newPhotoAlbum-icon" />
            New Photo Album
          </h1>
        </Link>
        <div className="newPhotoAlbum-top-btns">
          <button
            onClick={handleSaveToDatabase}
            className="save-btn"
            disabled={loading}
          >
            {loading ? "Saving Album Images..." : "Save Album Images"}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="newPhotoAlbum-content">
        {/* Display Added Photos */}
        <div className="added-photos">
          {photoAlbums.map((photo, index) => (
            <div key={index} className="photo-item">
              <img src={photo.image} alt="Photo" className="photo-thumb" />
              <div className="added-photos-btn">
                <button
                  className="delete-btn"
                  onClick={() => handleRemovePhoto(index)}
                  aria-label="Delete Photo"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Upload Section */}
        <div className="newPhotoAlbum-content-details">
          <div className="newPhotoAlbum-content-details-card">
            <div
              className={`newPhotoAlbum-content-details-left ${
                image ? "bg-none" : ""
              }`}
              onClick={handleClick}
              role="button"
              tabIndex={0}
              aria-label="Upload Photo"
            >
              {image ? (
                <img src={image} className="main-image" alt="Selected Photo" />
              ) : (
                <>
                  <img src={addImg} alt="Add Photo" className="addimage" />
                  <p>Add Photo</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <div className="photo-add-btn">
              <button onClick={handleAddPhoto} className="image-add-btn">
                <FaPlus className="add-icon" /> Add Images
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPhotoAlbum;
