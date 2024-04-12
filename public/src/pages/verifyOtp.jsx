import {React,useState} from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { verifyOtp } from "../utils/APIRoutes";


const Verify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      const email=localStorage.getItem("verificationEmail");
      const {data} = await axios.post(verifyOtp, { email, otp });
      setMessage(data.msg);
      if(data.status===true){
        console.log(data.user);
        localStorage.setItem("USER", JSON.stringify(data.user));
        navigate("/posts");
      }
    } catch (error) {
      console.error(error);
      setMessage('Error verifying OTP');
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
      <p>{message}</p>
    </div>
  )
}

export default Verify;
