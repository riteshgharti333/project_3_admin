import "./Navbar.scss";

import user_img from "../../assets/images/11.jpg";
import { useContext } from "react";
import { Context } from "../../context/Context";

import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const { user } = useContext(Context);

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { month: "long", day: "2-digit", year: "numeric" };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="date">
          <p>Today's Plan</p>
          <p>{currentDate}</p>
        </div>
      </div>

      <div className="navbar-right">
        <FaUser className="usericon" />

        <div className="user-desc">
          <p>{user?.user?.name}</p>
          {/* <p>CEO</p> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
