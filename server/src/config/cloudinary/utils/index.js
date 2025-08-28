const cloudinary = require("../index.js")

exports.uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image", folder: "avatars"
    })
    return {
      url: result?.secure_url,
      public_id: result?.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};

// 🔹 Delete image by public_id
exports.deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    throw err;
  }
};
