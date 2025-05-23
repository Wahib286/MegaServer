const User = require("../models/User");
const {mailSender} = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//reset password token
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const { email } = req.body;
    //validate & check user for this email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email`,
      });
    }
    //generate token
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    const updateDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );
    //create url
    const url = `http://localhost:3000/update-password/${token}`;
    //send mail containing url
    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link : ${url}`
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Email sent successfully, Please check email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while Reset Password",
    });
  }
};

exports.resetPassword = async(req,res)=>{
    try{
    //data fetch
    const {password, confirmPassword, token}= req.body;
    //validation
    if(password!==confirmPassword){
        return res.status(401).json({
            success: false,
            message: "Password does'nt match",
          });
    }
    //get user details from db using token
    const userDetails = await User.findOne({token});
    //if no entry - invalid token
    if(!userDetails){
        return res.status(401).json({
            success: false,
            message: "Token is invalid",
          });
    }
    //token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(401).json({
            success: false,
            message: "Token Expired",
          });
    }
    //hash pwd
    const hashedPassword = await bcrypt.hash(password,10);
    //password update
    await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});
    //return response
    return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset password",
          });
    }
}