const cloudinary = require("cloudinary").v2;

async function uploadImageToCloudinary(file, folder, quality = null, height = null) {
    const transformation = {};
  
    if (quality) {
      transformation.quality = quality;   
    }
  
    if (height) {
      transformation.height = height;    // use custom height if given
      transformation.crop = "scale";     // maintain aspect ratio
    }
  
    const options = {
      folder,
      resource_type: "auto",
      transformation: [transformation]
    };
  
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }
  