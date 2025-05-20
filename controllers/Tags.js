const Tag = require("../models/");

exports.createTag = async (req,res)=>{
    try{
        //fetch data 
        const {name,description} = req.body;
        //validation
        if(!name || !description){
            return res.status(401).json({
                success: false,
                message: "All feilds are required.",
              });
        }
        //create entry in db
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Tags created successfully.",
          });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wronng while creating tags",
          });
    }
}

exports.showAlltags = async(req,res)=>{
    try{
        const allTags = await Tag.find({}, {name:true, description:true});
        return res.status(200).json({
            success: true,
            message: "All tags returned",
          });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "something went wronng while getting tags",error,
          });
    }
}
