import React, { useEffect,useState } from 'react'
import Logout  from './Logout'
import axios from 'axios'
import { allPostsRoute, addPostRoute } from '../utils/APIRoutes'
import { useNavigate, Link } from "react-router-dom";

export default function Post() {

  const navigate = useNavigate();
  const [posts, setposts] = useState([]);
  const [reload, setreload] = useState(false);
  const [values, setValues] = useState({ text: ""});
  const username = JSON.parse(
    localStorage.getItem("USER")
  ).username;

  useEffect(()=>{
    axios
    .get(`${allPostsRoute}`)
    .then((res) => {
      const postData = Array.isArray(res.data) ? res.data.reverse() : [];
      setposts(postData);
    })
    .catch((e) => console.log(e));
  },[reload])

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
      const { text } = values;
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
      setreload(!reload);
  };


  return (
    <div className='FormContainer'>
        <Logout/>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="heading">
              <h1>WRITE POST</h1>
            </div>
          <input
            type="text"
            placeholder="ADD TEXT HERE"
            name="text"
            onChange={(e) => handleChange(e)}
            min="1"
          />
          <button type="submit">ADD POST</button>
        </form>
        <div className="posts-section">
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <p>{post.username}</p>
                  <p>{post.text}</p>
                  <br></br>
                </li>
              ))}
            </ul>
          </div>
    </div>
  )
}
