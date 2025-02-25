import "./Sidebar.scss";
import logo from "../../assets/images/logo2.png";
import { RxDashboard } from "react-icons/rx";
import { MdHomeMax } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { GrGroup, GrContact } from "react-icons/gr";
import { HiOutlineLogin } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const { user } = useContext(Context);
  const location = useLocation(); // Get current location

  const menuItems = [
    { path: "/", icon: <RxDashboard />, label: "Dashboard" },
    { path: "/home-banner", icon: <MdHomeMax />, label: "Home Banner" },
    { path: "/portfolio", icon: <FaRegImage />, label: "Portfolio" },
    { path: "/teams", icon: <GrGroup />, label: "Teams" },
    { path: "/messages", icon: <GrContact />, label: "Contact Messages" },
    { path: "/contact-2-messages", icon: <GrContact />, label: "Contact 2 Messages" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="sidebar-contents">
        {menuItems.map(({ path, icon, label }) => (
          <Link to={path} key={path}>
            <div className={`sidebar-option ${location.pathname === path ? "active" : ""}`}>
              {icon}
              <p>{label}</p>
            </div>
          </Link>
        ))}
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
