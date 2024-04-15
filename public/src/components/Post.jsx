import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import { allPostsRoute, addPostRoute } from "../utils/APIRoutes";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/post.css";
import Spinner from "./Spinner";
import Sorting from "./Sorting";

export default function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [currUsername, setCurrUsername] = useState(null);
  const [currUserId, setCurrUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const GetPosts = async ()=>{
      axios
      .get(`${allPostsRoute}`)
      .then((res) => {
        const postData = Array.isArray(res.data) ? res.data.reverse() : [];
        setTimeout(() => {
          setPosts(postData);
          setLoading(false);
        }, 600);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    }
    GetPosts();
    
  }, [reload]);

  useEffect(() => {
    if (localStorage.getItem("USER")) {
      const username = JSON.parse(localStorage.getItem("USER")).username;
      const userId= JSON.parse(localStorage.getItem("USER"))._id;
      setCurrUsername(username);
      setCurrUserId(userId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const text = event.target.elements.text.value;
    const topic =event.target.elements.topic.value;
    if (text.length < 1) {
      alert("Empty");
      return ;
    }
    if(topic.length<1){
      alert("Topic Required");
      return ;
    }
    const { data } = await axios.post(addPostRoute, {
      text,
      topic,
      currusername: currUsername,
      currUserId
    });
    if (data.status === false) {
      alert(data.msg);
    }
    if (data.status === true) {
      alert("Post Added Successfully");
    }
    event.target.elements.text.value = "";
    event.target.elements.topic.value = "";
    setReload(!reload);
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
            {clickedUsername === currUsername ? (
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
                        <p>{post.topic}</p>
                        <p>{post.text}</p>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                        <button> Reply </button>
                      </div>
                      <br />
                    </li>
                  ))}
            </ul>
          </div>
          {loading ? <Spinner /> : null}
        </>
      );
    } else {
      return (
        <>
          <button onClick={() => handleUsernameClick(currUsername)} >
            My Profile
          </button>
          <p>All Posts</p>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="heading">
              <h1>WRITE POST</h1>
            </div>
            <input
              type="text"
              placeholder="Topic"
              name="topic"
              min="1"
            />
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
                      <p>{post.topic}</p>
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
            {loading ? <Spinner /> : null}
          </div>
        </>
      );
    }
  };

  return (
    <div className="FormContainer">
      <Logout />
      <Sorting posts={posts} setPosts={setPosts}/>
      {showPosts()}
    </div>
  );
}
