import "./NewVideo.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const NewVideo2 = () => {
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addlink = async () => {
    if (!link) {
      toast.error("Please add link");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${baseUrl}/pre-wedding-film/new-video`,
        { link },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate(`/pre-wedding-film-videos`);
      }
    } catch (error) {
      console.error("Error adding video:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newVideo">
      <div className="newVideo-top">
        <Link onClick={() => navigate(-1)} className="back-link">
          <h1>
            <RiArrowLeftWideFill className="portfolio-icon" />
            New Pre Wedding Film Video
          </h1>
        </Link>
        <div className="newVideo-top-btns">
          <button
            disabled={loading}
            onClick={addlink}
            className="add-portfolio-btn"
          >
            {loading ? "Adding YouTube link..." : "Add YouTube Link"}
          </button>
        </div>
      </div>

      <div className="newVideo-content">
        <h1>YouTube Link</h1>

        <div className="youtube-link">
          <input
            type="text"
            placeholder="Add YouTube link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewVideo2;
