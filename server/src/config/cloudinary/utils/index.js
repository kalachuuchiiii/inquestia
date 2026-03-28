const cloudinary = require("../index.js");

exports.uploadImage = async (filePath, folder = 'avatars', transformation = [ {
          width: 150,
          height: 150,
          crop: "fill", 
          gravity: "auto" 
        }]) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder,
      transformation,
    });

    return {
      url: result?.secure_url,
      public_id: result?.public_id,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw err;
  }
};
