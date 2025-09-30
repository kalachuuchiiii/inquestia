const cloudinary = require("../index.js");

exports.uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder: "avatars",
      transformation: [
        {
          width: 150,
          height: 150,
          crop: "fill", 
          gravity: "auto" 
        }
      ]
    });

    return {
      url: result?.secure_url,
      public_id: result?.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};

exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    throw err;
  }
};
