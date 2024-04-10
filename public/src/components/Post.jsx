import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import { allPostsRoute, addPostRoute } from "../utils/APIRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import Reply from "./Reply";
import "../css/post.css";

export default function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setposts] = useState([]);
  const [reload, setreload] = useState(false);
  const [currusername, setusername] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      const data = JSON.parse(localStorage.getItem("USER")).username;
      setusername(data);
    }
  },[]);

  useEffect(() => {
    axios
      .get(`${allPostsRoute}`)
      .then((res) => {
        const postData = Array.isArray(res.data) ? res.data.reverse() : [];
        setposts(postData);
      })
      .catch((e) => console.log(e));
  }, [reload]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value;
    if (text.length < 1) {
      alert("Empty");
      return false;
    }
    //   console.log(text);
    //   console.log(username);
    const { data } = await axios.post(addPostRoute, {
      text,
      currusername,
    });
    if (data.status === false) {
      alert(data.msg);
    }
    if (data.status === true) {
      alert("Post Added Successfully");
    }
    event.target.elements.text.value = "";
    setreload(!reload);
  };

  const handleReplyClick = (postId) => {
    navigate(`/posts/${postId}`);
  };
  const handleUsernameClick = (username) => {
    navigate(`/posts?username=${username}`);
  };

  const showPosts = () => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      const clickedUsername = params.get("username");
      return (
        <>
          <div className="posts-section">
            <p>{clickedUsername}</p>
            <ul>
              {posts &&
                posts
                  .filter((post) => post.username === clickedUsername)
                  .map((post) => (
                    <li key={post._id}>
                      <div onClick={() => handleReplyClick(post._id)}>
                        <p>{post.text}</p>
                        <button> Reply </button>
                      </div>
                      <br />
                    </li>
                  ))}
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleUsernameClick(currusername)}>
            My Profile
          </button>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="heading">
              <h1>WRITE POST</h1>
            </div>
            <input
              type="text"
              placeholder="ADD TEXT HERE"
              name="text"
              min="1"
            />
            <button type="submit">ADD POST</button>
          </form>
          <div className="posts-section">
            <ul>
              {posts &&
                posts.map((post) => (
                  <li key={post._id}>
                    <p onClick={() => handleUsernameClick(post.username)}>
                      {post.username}
                    </p>
                    <div onClick={() => handleReplyClick(post._id)}>
                      <p>{post.text}</p>
                      <button> Reply </button>
                    </div>
                    <br />
                  </li>
                ))}
            </ul>
          </div>
        </>
      );
    }
  };

  return (
    <div className="FormContainer">
      <Logout />
      {showPosts()}
    </div>
  );
}
