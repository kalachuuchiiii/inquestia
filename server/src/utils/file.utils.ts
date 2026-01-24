import cloudinary from "@/config/cloudinary";

export const uploadImage = async (
  filePath: string,
  folder: string,
  transformation = [
    {
      width: 150,
      height: 150,
      crop: "fill",
      gravity: "auto",
    },
  ]
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder,
      transformation,
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    throw err;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw err;
  }
};
