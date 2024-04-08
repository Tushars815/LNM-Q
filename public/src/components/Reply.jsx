import React, { useEffect,useState } from 'react'
import { allPostsRoute , addReplyRoute} from '../utils/APIRoutes'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Logout from './Logout';

export default function Reply({ postId }) {
    const navigate = useNavigate();
    const [post, setpost] = useState(null);
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
    
  

    useEffect(() => {
      axios
      .get(`${allPostsRoute}/${postId}`)
      .then((res) => {
        setpost(res.data);
      })
      .catch((e) => console.log(e));
  }, [postId, reload]);

      const handleSubmit = async (event) => {
        event.preventDefault();
          const  text  = event.target.elements.text.value;
          if(text.length <1){
            alert("Empty");
            return false;
          }
          const { data } = await axios.post(addReplyRoute, {
            text,
            username,
            postId
          });
          if (data.status === false) {
            alert(data.msg);
          }
          if (data.status === true) {
            alert("Reply Added Successfully");
          }
          event.target.elements.text.value="";
          setreload(!reload);
      };
    return (
      <div className='FormContainer'>
        <Logout/>
        <button>My Profile</button>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="heading">
              <h1>WRITE REPLY</h1>
            </div>
          <input
            type="text"
            placeholder="ADD TEXT HERE"
            name="text"
            min="1"
          />
          <button type="submit">ADD POST</button>
        </form>
         <div className="post-section">
                {post && (
                <>
                  <p>{post.username}</p>
                  <p>{post.text}</p>
                  <p>Replies:</p>
                  <ul>
                     {post.replies && post.replies.reverse().map((reply) => (
                        <li key={reply._id}>
                          <p>Username: {reply.username}</p>
                          <p>{reply.text}</p>
                          <br></br>
                        </li> 
                      ))}
                  </ul>
                </>
              )}
          </div>
      </div>
    )
  }
