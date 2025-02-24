import "./SinglePortfolio.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const SinglePortfolio = () => {
  const navigate = useNavigate();

  const [singleData, setSingleData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/portfolio/${id}`);
        setSingleData(data?.portfolio);
      } catch (error) {
        console.error("Error fetching single data:", error);
      }
    };

    fetchSingleData();
  }, [id]);

  const deleteSingleData = async () => {
    try {
      const { data } = await axios.delete(`${baseUrl}/portfolio/${id}`);
      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePortfolio">
      <div className="singlePortfolio-top">
        <Link onClick={() => navigate(-1)}>
          <h1>
            <RiArrowLeftWideFill className="Portfolio-icon" /> Portfolio
          </h1>
        </Link>

        <div className="singlePortfolio-top-btns">
          <Link to={`/update-portfolio/${id}`} className="update-btn">
            Update
          </Link>
          <Link
            onClick={() => deleteSingleData(singleData._id)}
            className="update-btn"
          >
            Delete
          </Link>
        </div>
      </div>

      <div className="singlePortfolio-contents">
        <div className="singlePortfolio-contents-top">
          <h1>Portfolio Content</h1>
        </div>

        <div className="singlePortfolio-contents-card">
          <img src={singleData.image} alt="" />
          <div className="singlePortfolio-contents-card-desc">
            <h2>{singleData.title}</h2>
            <p>{singleData.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePortfolio;
