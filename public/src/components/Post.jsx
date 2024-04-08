import React, { useEffect,useState } from 'react'
import Logout  from './Logout'
import axios from 'axios'
import { allPostsRoute, addPostRoute } from '../utils/APIRoutes'
import { useNavigate, Link } from "react-router-dom";
import Reply from './Reply';
import '../css/post.css';

export default function Post() {

  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [reload, setreload] = useState(false);
  const [username, setusername] =useState(null);

  useEffect(()=>{
    if (localStorage.getItem("USER")) {
      const data = JSON.parse(
       localStorage.getItem("USER")
     ).username;
     setusername(data);
    }
  })
  
  

  useEffect(()=>{
    axios
    .get(`${allPostsRoute}`)
    .then((res) => {
      const postData = Array.isArray(res.data) ? res.data.reverse() : [];
      setposts(postData);
    })
    .catch((e) => console.log(e));
  },[reload])

  const handleSubmit = async (event) => {
    event.preventDefault();
      const  text  = event.target.elements.text.value;
      if(text.length <1){
        alert("Empty");
        return false;
      }
    //   console.log(text);
    //   console.log(username);
      const { data } = await axios.post(addPostRoute, {
        text,
        username
      });
      if (data.status === false) {
        alert(data.msg);
      }
      if (data.status === true) {
        alert("Post Added Successfully");
      }
      event.target.elements.text.value="";
      setreload(!reload);
  };

  const handleReplyClick= (postId)=>{
    navigate(`/posts/${postId}`)
  }

  return (
    <div className='FormContainer'>
        <Logout/>
        <button>My Profile</button>
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
              {posts && posts.map((post) => (
                <li key={post._id} onClick={() => handleReplyClick(post._id)}>
                  <p>{post.username}</p>
                  <p>{post.text}</p>
                  <button> Reply </button>
                  <br></br>
                </li>
              ))}
            </ul>
          </div>
    </div>
  )
}
