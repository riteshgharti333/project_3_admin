import "./Login.scss";

import logo from "../../assets/images/logo2.png";
import { useNavigate } from "react-router-dom";

import { baseUrl } from "../../main";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../context/Context";

const Login = () => {
  const navigate = useNavigate();


  const { dispatch } = useContext(Context);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
     if(response && response.data){
      toast.success(response.data.message);
     }
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="login-logo">
        <img src={logo} alt="" />
      </div>
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
