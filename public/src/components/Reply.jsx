import React, { useEffect,useState } from 'react'
import { allPostsRoute , addReplyRoute, deletePostRoute, deleteReplyRoute} from '../utils/APIRoutes'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Logout from './Logout';

export default function Reply({ postId }) {
    const navigate = useNavigate();
    const [post, setpost] = useState(null);
    const [reload, setreload] = useState(false);
    const [currusername, setusername] =useState(null);

    useEffect(()=>{
     // console.log("User check");
    if (localStorage.getItem("USER")) {
      const data = JSON.parse(
       localStorage.getItem("USER")
     ).username;
     setusername(data);
    }
  },[])
    


    useEffect(() => {
      //console.log("Get msg");
      axios
      .get(`${allPostsRoute}/${postId}`)
      .then((res) => {
        setpost(res.data);
      })
      .catch((e) => console.log(e));
      //console.log(post);
  }, [reload]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const  text  = event.target.elements.text.value;
      if(text.length <1){
          alert("Empty");
          return false;
      }
      const { data } = await axios.post(addReplyRoute, {
          text,
          currusername,
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

      const handleUsernameClick = (username) => {
        navigate(`/posts?username=${username}`);
      };
      const handledeletepost =async ()=>{
        //console.log("hello post");
        const data =await axios.post(deletePostRoute,{
          postId
        })
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          alert(data.msg);
        }
        navigate("/posts");
      };
      const handledeletereply = async (replyId)=>{
        //console.log("hello reply");
        const data =await axios.post(deleteReplyRoute,{
          postId,
          replyId
        })
        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          alert(data.msg);
        }
        setreload(!reload);

      };


    return (
      <div className='FormContainer'>
        <Logout/>
        <button onClick={()=> handleUsernameClick(currusername)}>My Profile</button>
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
          <button type="submit">ADD Reply</button>
        </form>
         <div className="post-section">
                {post && (
                <>
                  <p>{post.username}</p>
                  <p>{post.text}</p>
                  {currusername === post.username && (
                    <>
                      <button onClick={()=> handledeletepost()}>Delete</button>
                      <br />
                    </>
                  )}
                  <br/>
                  <p>Replies:</p>
                  <ul>
                     {post.replies && post.replies.reverse().map((reply) => (
                        <li key={reply._id}>
                          <p onClick={()=> handleUsernameClick(reply.username)}>Username: {reply.username}</p>
                          <p>{reply.text}</p>
                          {currusername === reply.username && (
                            <>
                              <button onClick={()=> handledeletereply(reply._id)}>Delete</button>
                              <br/>
                            </>
                          )}
                          <br/>
                        </li> 
                      ))}
                  </ul>
                </>
              )}
          </div>
      </div>
    )
  }
