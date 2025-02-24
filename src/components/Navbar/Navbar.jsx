import "./Navbar.scss";

import user_img from "../../assets/images/11.jpg";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = () => {

  const {user} = useContext(Context);


  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="date">
          <p>Today's Plan</p>
          <p>March 23, 2024</p>
        </div>
      </div>

      <div className="navbar-right">
        <img src={user_img} alt="" />

        <div className="user-desc">
          <p>{user?.user?.name}</p>
          {/* <p>CEO</p> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
