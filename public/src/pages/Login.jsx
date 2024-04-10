import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
// import { im } from "../assets/im.jpg";
const im = require("../assets/video.gif");
// const back = require("../assets/bg.gif");

export default function Login() {
  const navigate = useNavigate();
  // const [values, setValues] = useState({ username: "", password: "" });
  useEffect(() => {
    if (localStorage.getItem("USER")) {
      navigate("/posts");
    }
  }, []);

  const validateForm = (event) => {
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
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
      const password = event.target.elements.password.value;
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
      {/* <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto flex justify-center items-center space-x-8">
          <div className="w-1/2">
            <img src="../assets/im.jpg" alt="" />
            <img
              src={require("../assets/im.jpg").default}
              alt="Background"
              className="w-full h-auto"
            />
          </div>

          <div className="w-1/2">
            <div className="bg-white py-8 px-4 shadow rounded-lg">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
                Sign in to your account
              </h2>
              <form
                className="space-y-6"
                action=""
                onSubmit={(event) => handleSubmit(event)}
              >
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
                  className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
                <span>
                  Don't have an account ?{" "}
                  <Link to="/register">Create One.</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="FormContainer">
        <form >
          <div className="brand">
            <div className="heading">
              <h1>LNM Q</h1>
            </div>
            <h2>LOGIN</h2>
          </div>
          <input type="text" placeholder="Username" name="username" min="3" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </div> */}

      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
          <div className="grid sm:grid-cols-2">
            <div className="hidden sm:block">
              <img src={im} alt="" />
            </div>
            <div className=" bg-white sm:flex sm:items-center sm:justify-center sm:py-8">
              <div className="p-8">
                <h2 className="font-dongpora text-5xl font-semibold text-yellow-600">
                  Sign in
                </h2>
                <p className="text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Username"
                    name="username"
                    min="3"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="w-full p-3 bg-blue-600 text-white rounded-md"
                    type="submit"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  New Here?{" "}
                  <span className="text-blue-600 cursor-pointer">
                    <Link to="/register">Create Account.</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className=" flex items-center justify-center min-h-screen bg-[url('https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover">
        <div className="z-1 max-w-md mx-auto bg-[#F8E7D5] rounded-xl shadow-xl border border-gray-300 overflow-hidden md:max-w-2xl">
          <div className="md:grid md:grid-cols-2">
            <div className="md:shrink-0">
              <img
                className="h-48 w-full object-cover md:h-full "
                src={im}
                alt="Student Illusion"
              />
            </div>
            <div className="p-8">
              <div className="p-8">
                <h2 className="font-dongpora text-6xl text-[#F1853B]">
                  Sign in
                </h2>
                <p className="text-gray-500">Welcome to LNM-Q</p>
                <form
                  className="space-y-5 mt-5"
                  action=""
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Username"
                    name="username"
                    min="3"
                  />
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    className="w-full p-3 bg-[#1E75D5] text-white rounded-md"
                    type="submit"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-2">
                  New Here?{" "}
                  <span className="text-[#1E75D5] cursor-pointer">
                    <Link to="/register">Create Account.</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
