const Course = require("../models/Course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");

exports.createCourse = async (req,res)=>{
    try{
        //fetch data 
        const {courseName, courseDescription, whatYouWillLearn, price, tag}= req.body;

        const thumbnail = req.files.thumbnailImage;
        //validate data
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag){
            return res.status(400).json({
                success: false,
                message: "All feilds are required.",
              });
        }
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details :",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor details not fouund",
              });
        }

        //

    }
    catch(error){

    }
}