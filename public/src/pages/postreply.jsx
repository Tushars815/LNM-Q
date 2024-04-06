import React, { useState, useEffect } from "react";
import Reply from "../components/Reply";
import { useNavigate, Link , useParams } from "react-router-dom";



export default function Posts() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("USER")) {
        navigate("/login");
    }
  }, []);

  const params = useParams();
  const postId = params.postId;
 // console.log(postId);

  return (
    <>
      <div className="FormContainer">
        <Reply postId={postId}/>
      </div>
    </>
  );
}
