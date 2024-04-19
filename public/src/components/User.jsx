import React, { useEffect, useState } from 'react';
import Logout from "./Logout";
import Sorting from './Sorting';
import axios from "axios";
import { getUserRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export default function User({ userId }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currUserId, setCurrUserId] = useState(null);
   // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${getUserRoute}/${userId}`);
                data.posts.reverse();
                setPosts(data.posts);
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [userId]); // Add userId as a dependency

    useEffect(() => {
        if (localStorage.getItem("USER")) {
            const userId = JSON.parse(localStorage.getItem("USER"))._id;
            setCurrUserId(userId);
        }
    }, []);

    const handleReplyClick = (postId) => {
        navigate(`/posts/${postId}`);
      };

    return (
        <div className='FormContainer'>
            <Logout />
            <Sorting posts={posts} setPosts={setPosts} username={true}/>
            {user && (
                <>
                    {currUserId===userId ? (
                        <p>My Profile</p>
                    ): (
                        <p>{user.username} Profile</p>
                    )}   
                    <p>{user.email}</p>
                    <p>{user.year}</p>
                    <p>{user.branch}</p>
                    {posts && posts.map((post) => (
                        <li key={post._id}>
                          <div onClick={() => handleReplyClick(post._id)}>
                            <p>{post.topic}</p>
                            <p>{post.text}</p>
                            <button> Reply </button>
                          </div>
                          <div className="post-time">
                            <p>{new Date(post.createdAt).toLocaleString()}</p>
                          </div>
                          <br/>
                        </li> 
                      ))}
                </>
            )}
        </div>
    );
}
