import { useEffect, useState } from "react";
import "./MobileBanner.scss";

import { Link } from "react-router-dom";
import axios from "axios";

import { baseUrl } from "../../main";
import toast from "react-hot-toast";

const MobileBanner = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/mobile/all-mobile-banners`
        );
        if (data && data.homeBanner) {
          setAllData(data.homeBanner);
        }
      } catch (error) {
        console.error("Error fetching home banners:", error);
      }
    };

    fetchData();
  }, []);

  const deleteImage = async (id) => {
    if (!id) return;

    try {
      const { data } = await axios.delete(`${baseUrl}/mobile/${id}`, {
        withCredentials: true,
      });

      if (data) {
        toast.success(data.message);
      }
      setAllData((prev) => prev.filter((homeBanner) => homeBanner._id !== id));

      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting home banner:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="portfolio">
      <div className="portfolio-top">
        <h1>Mobile Banner</h1>
        <Link to={"/new-mobile-banner"}>
          <button>Add New Mobile Banner</button>
        </Link>
      </div>

      <div className="portfolio-imgs">
        {allData?.length > 0 &&
          allData.map((item, index) => (
            <div className="portfolio-img" key={index}>
              <img src={item.image} alt="" />

              <div className="portfolio-img-desc">
                <button onClick={() => setSelectedImg(item.image)}>
                  Full View
                </button>
                <button onClick={() => deleteImage(item._id)}>
                  Delete Image
                </button>
              </div>
            </div>
          ))}
      </div>

      {selectedImg && (
        <div className="image-modal" onClick={() => setSelectedImg(null)}>
          <img src={selectedImg} alt="Fullscreen Preview" loading="lazy" />
          <span className="close-btn" onClick={() => setSelectedImg(null)}>
            ×
          </span>
        </div>
      )}
    </div>
  );
};

export default MobileBanner;
