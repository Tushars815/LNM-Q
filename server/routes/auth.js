const router = require("express").Router();
const User = require("../models/userModel");
const Otp = require("../models/otpSchema");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    if(!user.verified) return res.json({ msg: "Email not Verified", status: false });
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    //console.log("aagya");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    // delete user.password;
    let code=Math.floor(100000 + Math.random() * 900000);
    const OTP = await new Otp({
			userId: user._id,
			otp: code,
		}).save();

    const msg = `
    <html>
      <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Dear ${user.username},</p>
          <p>Thank you for registering with Us!</p>
          <p>To ensure the security of your account and verify your email address, we have sent you a One-Time Password (OTP). Please use the OTP below to complete the email verification process:</p>
          <p><strong>OTP:</strong> <span style="font-weight: bold; color: #007bff;">${code}</span></p>
          <p>If you did not request this OTP or if you have any questions, please contact our support team immediately.</p>
          <p>Thanks</p>
        </div>
      </body>
    </html>
  `;

		await sendEmail(user.email, "Verify Email", msg);
    return res.json({ status: true , msg:"Email Verified Successfully",user});
  } catch (error) {
		console.log(error);
		return res.json({ msg: "Problem with OTP",status: false });
	}
});


router.post('/verify', async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    // console.log(email);
    // console.log(otp);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found', status: false });
    }

    const otpRecord = await Otp.findOne({ userId: user._id, otp });
    if (!otpRecord) {
      return res.status(400).json({ msg: 'Invalid OTP', status: false });
    }

    user.verified = true;
    await user.save();
    await Otp.deleteOne({ _id: otpRecord._id });
    //console.log(user);
    return res.json({ msg: "Email verified successfully", status: true ,user});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error', status: false });
  }
});

module.exports = router;