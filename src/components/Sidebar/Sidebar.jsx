import "./Sidebar.scss";
import logo from "../../assets/images/logo2.png";
import { RxDashboard } from "react-icons/rx";
import { MdHomeMax } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { GrGroup, GrContact } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { IoAlbumsOutline } from "react-icons/io5";
import { RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { AiOutlineMobile } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";
import { IoVideocamOutline } from "react-icons/io5";

import { baseUrl } from "../../main";
import axios from "axios";
import { toast } from "react-hot-toast";
import { services } from "../../assets/data";

const Sidebar = () => {
  const { user, dispatch } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [openServices, setOpenServices] = useState(false);
  const [allService, setAllService] = useState([]);

  useEffect(() => {
    const allServices = async () => {
      const { data } = await axios.get(`${baseUrl}/services`);
      setAllService(data?.services);
    };
    allServices();
  }, []);

  const menuItems = [
    { path: "/", icon: <RxDashboard size={18} />, label: "Dashboard" },
    {
      path: "/home-banner",
      icon: <MdHomeMax size={18} />,
      label: "Home Banner",
    },
    {
      path: "/mobile-banner",
      icon: <AiOutlineMobile size={18} />,
      label: "Mobile Banner",
    },
    {
      path: "/photo-album",
      icon: <IoAlbumsOutline size={18} />,
      label: "Photo Album",
    },
    { path: "/portfolio", icon: <FaRegImage size={18} />, label: "Portfolio" },
    { path: "/teams", icon: <GrGroup size={18} />, label: "Teams" },
    { path: "/reviews", icon: <VscPreview size={18} />, label: "Reviews" },
    {
      path: "/messages",
      icon: <GrContact size={18} />,
      label: "Contact Messages",
    },
    {
      path: "/contact-2-messages",
      icon: <GrContact size={18} />,
      label: "Contact 2 Messages",
    },
    {
      path: "/wedding-cinematography-videos",
      icon: <IoVideocamOutline size={17} />,
      label: "Wedding Cinematography",
    },
    {
      path: "/pre-wedding-film-videos",
      icon: <IoVideocamOutline size={18} />,
      label: "Pre Wedding Film",
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/auth/logout`, null, {
        withCredentials: true,
      });

      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      toast.success("Logout Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout. Try again!");
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="sidebar-contents">
        <ul className="menu-items">
          {menuItems.map(({ path, icon, label }) => (
            <li key={path}>
              <Link to={path}>
                <div
                  className={`menu-item ${
                    location.pathname === path ? "active" : ""
                  }`}
                >
                  <span className="menu-icon">{icon}</span>
                  <span className="menu-label">{label}</span>
                </div>
              </Link>
            </li>
          ))}

          <li className="services-container">
            <div
              className={`menu-item ${openServices ? "active" : ""}`}
              onClick={() => setOpenServices(!openServices)}
            >
              <span className="menu-icon">
                <MdMiscellaneousServices size={18} />
              </span>
              <span className="menu-label">Services</span>
              <span className="menu-arrow">
                {openServices ? (
                  <RiArrowDownSLine size={18} />
                ) : (
                  <RiArrowRightSLine size={18} />
                )}
              </span>
            </div>

            {openServices && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="submenu"
              >
                <ul>
                  {allService.length > 0 ? (
                    allService.map((service, index) => {
                      const matchedService = services.find(
                        (s) => s.service_name === service.serviceName
                      );
                      return matchedService ? (
                        <li key={index}>
                          <Link to={`${matchedService.link}/${service._id}`}>
                            <div className="submenu-item">
                              {service.serviceName}
                            </div>
                          </Link>
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li className="no-services">No services available</li>
                  )}
                </ul>
              </motion.div>
            )}
          </li>
        </ul>

        <div className="auth-button">
          {user ? (
            <button onClick={handleLogout} className="logout-btn">
              <span>Logout</span>
              <IoLogOutOutline size={18} />
            </button>
          ) : (
            <Link to="/login" className="login-btn">
              <span>Login</span>
              <IoLogInOutline size={18} />
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
