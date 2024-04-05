import React from "react";
import { useNavigate } from "react-router-dom";



export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="button" onClick={handleClick}>
        LOGOUT
    </div>
  );
}

