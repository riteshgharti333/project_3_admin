import "./Navbar.scss";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { FaUser } from "react-icons/fa";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(Context);
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', month: "long", day: "2-digit", year: "numeric" };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, []);

  const handleLogout = () => {
    // Optional: logout API call
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="date">
          <h1 className="title">Today's Plan</h1>
          <p className="date-text">{currentDate}</p>
        </div>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <Link to={"/profile"} className="profile-link">
              <div className="user-avatar">
                <FaUser className="user-icon" />
              </div>
              <div className="user-info">
                <span className="username">{user?.user?.name}</span>
                {user?.user?.isAdmin && (
                  <span className="user-role">Admin</span>
                )}
              </div>
            </Link>

            <button className="logout-btn" onClick={handleLogout}>
              <span>Logout</span>
              <IoLogOutOutline className="icon" />
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            <span>Login</span>
            <IoLogInOutline className="icon" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;