import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import { allPostsRoute, addPostRoute } from "../utils/APIRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import Reply from "./Reply";
import "../css/post.css";
import Spinner from "./Spinner";

export default function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setposts] = useState([]);
  const [reload, setreload] = useState(false);
  const [currusername, setusername] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      const data = JSON.parse(localStorage.getItem("USER")).username;
      setusername(data);
    }
  },[]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${allPostsRoute}`)
      .then((res) => {
        const postData = Array.isArray(res.data) ? res.data.reverse() : [];
        setTimeout(() => {
          setposts(postData);
          setLoading(false);
        }, 2500);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false); // Make sure to set loading to false on error too
      });
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
          {clickedUsername === currusername ? (
            <p>My Posts</p>
          ) : (
            <p>{clickedUsername} Posts</p>
          )}
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
          {loading? <Spinner/>:null}
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleUsernameClick(currusername)}>
            My Profile
          </button>
          <p>All Posts</p>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="heading">
              <h1>WRITE POST</h1>
            </div>
            <textarea
              placeholder="ADD TEXT HERE"
              name="text"
              minLength={1}
              rows={4} 
              style={{ width: '100%', maxWidth: '500px' }} 
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
                    <div className="post-time">
                    <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                    <br />
                  </li>
                ))}
            </ul>
            {loading? <Spinner/>:null}
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
