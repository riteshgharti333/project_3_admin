import "./Sidebar.scss";
import logo from "../../assets/images/logo2.png";
import { RxDashboard } from "react-icons/rx";
import { MdHomeMax } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { GrGroup, GrContact } from "react-icons/gr";
import { HiOutlineLogin } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { IoAlbumsOutline } from "react-icons/io5";

import { baseUrl } from "../../main";

import axios from "axios";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/", icon: <RxDashboard />, label: "Dashboard" },
    { path: "/home-banner", icon: <MdHomeMax />, label: "Home Banner" },
    { path: "/photo-album", icon: <IoAlbumsOutline />, label: "Photo Album" },
    { path: "/portfolio", icon: <FaRegImage />, label: "Portfolio" },
    { path: "/teams", icon: <GrGroup />, label: "Teams" },
    { path: "/messages", icon: <GrContact />, label: "Contact Messages" },
    {
      path: "/contact-2-messages",
      icon: <GrContact />,
      label: "Contact 2 Messages",
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, { withCredentials: true });

      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout. Try again!");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="sidebar-contents">
        {menuItems.map(({ path, icon, label }) => (
          <Link to={path} key={path}>
            <div
              className={`sidebar-option ${
                location.pathname === path ? "active" : ""
              }`}
            >
              {icon}
              <p>{label}</p>
            </div>
          </Link>
        ))}
      </div>

      {user && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
          <IoLogOutOutline className="login-icon" />
        </button>
      )}
    </div>
  );
};

export default Sidebar;
