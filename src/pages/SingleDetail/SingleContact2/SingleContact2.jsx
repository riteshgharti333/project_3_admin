import "./SingleContact2.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowLeftWideFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../main";
import toast from "react-hot-toast";

const SingleContact2 = () => {
  const navigate = useNavigate();

  const [singleData, setSingleData] = useState({});
  const { id } = useParams();

  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/contact2/contact-2/${id}`);
        setSingleData(data?.contact);
        setEventDetails(data?.contact?.eventDetail);
      } catch (error) {
        console.error("Error fetching single data:", error);
      }
    };

    fetchSingleData();
  }, [id]);

  const deleteSingleData = async () => {
    try {
      const { data } = await axios.delete(
        `${baseUrl}/contact2/contact-2/${id}`
      );
      toast.success(data.message);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singleContact">
      <div className="singleContact-top">
        <Link onClick={() => navigate(-1)}>
          <h1>
            <RiArrowLeftWideFill className="singleContact-icon" /> Contact
            Message
          </h1>
        </Link>

        <div className="singleContact-top-btns">
          <button onClick={deleteSingleData}>
            <Link>Delete </Link>
          </button>
        </div>
      </div>

      <div className="singleContact-content">
        <div className="singleContact-content-desc">
          <p>Name : </p>
          <p>
            {singleData.firstName} {singleData.lastName}
          </p>
        </div>

        <div className="singleContact-content-desc">
          <p>Email : </p>
          <p>{singleData.email}</p>
        </div>

        <div className="singleContact-content-desc">
          <p>Phone Number : </p>
          <p>{singleData.phoneNumber}</p>
        </div>

        <div className="singleContact-content-desc">
          <p>Country : </p>
          <p>{singleData.country}</p>
        </div>

        <div className="singleContact-content-desc">
          <p>How Did You Hear About Us? :</p>
          <p>{singleData.howDidYouHearAboutUs}</p>
        </div>
        <div className="event">
          <p>Event Details : </p>
          <div className="singleContact-content-desc-bottom">
            <ul>
              <li>
                Date:<span>{eventDetails?.date}</span>
              </li>
              <li>
                Time : <span>{eventDetails?.time}</span>
              </li>
              <li>
                Venue Address:<span>{eventDetails?.venueAddress}</span>
              </li>
              <li>
                Number of Guests:<span>{eventDetails?.numberOfGuests}</span>
              </li>
              <li>
                Additional Requirements:
                <span>{eventDetails?.additionalRequirements}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContact2;
