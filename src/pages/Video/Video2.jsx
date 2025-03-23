import { useEffect, useState } from "react";
import "./Video.scss";

import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../main";
import toast from "react-hot-toast";

const Video2 = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/pre-wedding-film/all-videos`
        );
        if (data && data.videos) {
          setAllData(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  const deleteVideo = async (id) => {
    if (!id) return;

    try {
      const { data } = await axios.delete(`${baseUrl}/pre-wedding-film/${id}`);

      if (data) {
        toast.success(data.message);
      }
      setAllData((prev) => prev.filter((video) => video._id !== id));

      toast.success(data.message);
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video!");
    }
  };

  const getYouTubeThumbnail = (link) => {
    let videoId = "";

    if (link.includes("youtu.be/")) {
      videoId = link.split("youtu.be/")[1].split("?")[0];
    } else if (link.includes("youtube.com/watch?v=")) {
      videoId = link.split("v=")[1].split("&")[0];
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <div className="video">
      <div className="video-top">
        <h1>Pre Wedding Film Videos</h1>
        <Link to={"/pre-wedding-film/new-video"}>
          <button>Add New Video</button>
        </Link>
      </div>

      <div className="video-imgs">
        {allData?.length > 0 &&
          allData.map((item, index) => (
            <div className="video-img" key={index}>
              <img
                src={getYouTubeThumbnail(item.link)}
                alt="YouTube Thumbnail"
              />

              <div className="video-img-desc">
                <button onClick={() => deleteVideo(item._id)}>
                  Delete Video
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Video2;
