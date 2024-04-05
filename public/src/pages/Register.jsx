import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { registerRoute } from "../utils/APIRoutes";


export default function Register() {
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  

  const handleValidation = (event) => {
    const username = event.target.elements.username.value;
    const email= event.target.elements.email.value;
    const password= event.target.elements.password.value;
    const confirmPassword= event.target.elements.confirmPassword.value
    if (password !== confirmPassword) {
      alert("Password and confirm password should be same.");
      return false;
    } else if (username.length < 3) {
      alert("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 5) {
      alert("Password should be equal or greater than 5 characters.");
      return false;
    } else if (email === "") {
      alert("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation(event)) {
      const username = event.target.elements.username.value;
      const email= event.target.elements.email.value;
      const password= event.target.elements.password.value;
      const confirmPassword= event.target.elements.confirmPassword.value;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    // console.log("Form Submitted register");
  };

  return (
    <>
      <div className="FormContainer">
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <div className="heading">
              <h1>LNM Q</h1>
          </div>
            <h2>REGISTER</h2>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
        </div>
    </>
  );
}