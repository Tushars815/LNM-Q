import React,{useEffect} from 'react'
import { useNavigate , useLocation } from "react-router-dom";
import User from '../components/User'

export default function Profile() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("USER")) {
            navigate("/login");
        }
    }, []);
    const location = useLocation();
    const userId = location.state.userId;
  return (
    <User userId={userId}/>
  )
}
