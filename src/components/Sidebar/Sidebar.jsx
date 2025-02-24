import "./Sidebar.scss";

import logo from "../../assets/images/logo2.png";

import { RxDashboard } from "react-icons/rx";
import { MdHomeMax } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { GrContact } from "react-icons/gr";

import { HiOutlineLogin } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const { user } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="" />
      </div>

      <div className="sidebar-contents">
        <Link to={"/"}>
          <div className="sidebar-option">
            <RxDashboard className="sidebar-icon" />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to={"/home-banner"}>
          <div className="sidebar-option">
            <MdHomeMax className="sidebar-icon" />
            <p>Home Banner</p>
          </div>
        </Link>

        <Link to={"/portfolio"}>
          <div className="sidebar-option">
            <FaRegImage className="sidebar-icon" />
            <p>Portfolio</p>
          </div>
        </Link>

        <Link to={"/teams"}>
          <div className="sidebar-option">
            <GrGroup className="sidebar-icon" />
            <p>Teams</p>
          </div>
        </Link>

        <Link to={"/messages"}>
          <div className="sidebar-option">
            <GrContact className="sidebar-icon" />
            <p>Contact Messages</p>
          </div>
        </Link>

        
        <Link to={"/contact-2-messages"}>
          <div className="sidebar-option">
            <GrContact className="sidebar-icon" />
            <p>Contact 2 Messages</p>
          </div>
        </Link>
      </div>

      {user ? (
        <button>
          <Link to={"/login"} className="login-btn">
            Logout
            <IoLogOutOutline className="login-icon" />
          </Link>
        </button>
      ) : (
        <button>
          <Link to={"/login"} className="login-btn">
            Login
            <HiOutlineLogin className="login-icon" />
          </Link>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
