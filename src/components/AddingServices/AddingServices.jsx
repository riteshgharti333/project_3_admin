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

  const [serviceName, setServiceName] = useState("");

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

  const handleImageChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    const maxSize = 300 * 1024;

    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        toast.error("Image size should be less than 300 KB");
        return;
      }

      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleAddPhoto = useCallback(() => {
    if (!file) {
      toast.error("Please add an image before submitting.");
      return;
    }
    const newPhoto = { image, file };
    setServicesImage((prev) => [...prev, newPhoto]);
    setImage(null);
    setFile(null);
  }, [file, image]);

  // Remove photo from Services state
  const handleRemovePhoto = useCallback((index) => {
    setServicesImage((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // update
  const handleUpdate = async () => {
    if (serviceImages.length === 0 && singleData.length === 0) {
      toast.error("No images selected for update.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // ✅ Append new images
      serviceImages.forEach((photo) => {
        formData.append("images", photo.file);
      });

      // ✅ Append only the images you want to keep
      singleData.forEach((imageUrl) => {
        formData.append("images", imageUrl);
      });

      // ✅ Append the service name
      formData.append("serviceName", serviceName);

      const response = await axios.put(
        `${baseUrl}/services/${path}`,
        formData,

        {
          withCredentials: true,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        setServicesImage([]);

        // ✅ Refetch updated images
        const { data } = await axios.get(`${baseUrl}/services${path}`);
        setSingleData(data.serviceImages.images);
      }
    } catch (error) {
      console.error("Error updating images:", error);
      toast.error(error.response.data.message);
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
