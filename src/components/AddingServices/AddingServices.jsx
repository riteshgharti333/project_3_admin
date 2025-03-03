import { useRef, useState, useCallback, useEffect } from "react";
import "./AddingServices.scss";
import { FaTrash, FaPlus } from "react-icons/fa";
import addImg from "../../assets/images/addImg.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../main";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";

const AddingServices = ({ title, path }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [serviceImages, setServicesImage] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [serviceName , setServiceName] = useState("");

  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const getSingleData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/services${path}`);
        setSingleData(data?.serviceImages?.images || []);
        setServiceName(data?.serviceImages?.serviceName);

      } catch (error) {
        console.error("Error fetching images:", error);
        toast.error("Failed to fetch images.");
      }
    };
    getSingleData();
  }, [path]);

  // Handle image selection
  const handleImageChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile)); // Set image preview
      setFile(selectedFile); // Set file for upload
    }
  }, []);

  // Trigger file input click
  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Add new photo to the Services state
  const handleAddPhoto = useCallback(() => {
    if (!file) {
      toast.error("Please add an image before submitting.");
      return;
    }
    const newPhoto = { image, file };
    setServicesImage((prev) => [...prev, newPhoto]); // Add new photo
    setImage(null); // Reset image preview
    setFile(null); // Reset file
  }, [file, image]);

  // Remove photo from Services state
  const handleRemovePhoto = useCallback((index) => {
    setServicesImage((prev) => prev.filter((_, i) => i !== index)); // Remove photo by index
  }, []);

  const handleUpdate = async () => {
    if (serviceImages.length === 0 && singleData.length === 0) {
      toast.error("No images selected for update.");
      return;
    }

    setLoading(true);

    try {
      // Upload new images to Cloudinary
      const uploadedImages = await Promise.all(
        serviceImages.map(async (photo) => {
          const formData = new FormData();
          formData.append("file", photo.file);
          formData.append("upload_preset", "tk-site");
          formData.append("cloud_name", "ddmucrojh");
          formData.append("folder", "tk-production-images/services");

          const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/ddmucrojh/image/upload`,
            formData
          );

          return data.secure_url;
        })
      );

      // Combine existing and newly uploaded images
      const updatedImages = [...singleData, ...uploadedImages];

      // ✅ Add a default serviceName if missing
      const response = await axios.put(`${baseUrl}/services${path}`, {
        serviceName: serviceName,
        images: updatedImages,
      });

      if (response?.data?.success) {
        toast.success(response.data.message);
        setServicesImage([]);
        const { data } = await axios.get(`${baseUrl}/services${path}`);
        setSingleData(data.serviceImages.images);
      }
    } catch (error) {
      console.error("Error updating images:", error);
      toast.error("Failed to update images.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (index) => {
    const serviceImagesDetails = singleData.filter((_, i) => i !== index);
    setSingleData(serviceImagesDetails);
    setDeleteIndex(null);
    toast.success("Image removed from album (Not yet saved)");
  };

  return (
    <div className="addingServices">
      {/* Top Section */}
      <div className="addingServices-top">
        <Link to="#" onClick={() => navigate(-1)}>
          <h1>
            <RiArrowLeftWideFill className="addingServices-icon" /> {title}
          </h1>
        </Link>

        <div className="addingServices-top-btns">
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      {/* Existing Photos */}
      <div className="getting-photos">
        {singleData.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo} alt="Photo" className="photo-thumb" />
            <div className="added-photos-btn">
              <button
                className="delete-btn"
                onClick={() => setDeleteIndex(index)}
                aria-label="Delete Photo"
              >
                Delete
              </button>
            </div>

            {deleteIndex === index && (
              <div className="deleteCard">
                <div className="deleteCard-desc">
                  <h2>Sure to delete this photo?</h2>
                  <div className="deleteCard-desc-btns">
                    <button onClick={() => handleDelete(index)}>Yes</button>
                    <button onClick={() => setDeleteIndex(null)}>No</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Photos to be Uploaded */}
      <div className="added-photos">
        {serviceImages.map((photo, index) => (
          <div key={index} className="photo-item">
            <img src={photo.image} alt="Photo" className="photo-thumb" />
            <div className="added-photos-btn">
              <button
                className="delete-btn"
                onClick={() => handleRemovePhoto(index)}
                aria-label="Delete Photo"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload New Image Section */}
      <div className="service1-content">
        <div className="service1-content-card">
          <div
            className={`service1-content-left ${image ? "bg-none" : ""}`}
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
  );
};

export default AddingServices;
