import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";


export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  const validateForm = (event) => {
    const username = event.target.elements.username.value;
    const password= event.target.elements.password.value;
    if (username === "") {
      alert("Email and Password is required.");
      return false;
    } else if (password === "") {
      alert("Email and Password is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    // console.log("Form Submitted Login");
    event.preventDefault();
    if (validateForm(event)) {
      const username = event.target.elements.username.value;
      const password= event.target.elements.password.value;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        localStorage.setItem("USER", JSON.stringify(data.user));

        navigate("/posts");
      }
    }
  };

  return (
    <>
      <div className="FormContainer">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <div className="heading">
              <h1>LNM Q</h1>
          </div>
            <h2>LOGIN</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
    </div>
    </>
  );
}
