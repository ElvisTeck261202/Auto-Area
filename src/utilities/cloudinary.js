const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmgtmvqxy',
    api_key: '553116888248189',
    api_secret: 'wcQpF6ouGHo5gVQTz8S1ChtjdB0',
    secure: true
});

const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath , {
        folder : 'auto_area'
    });
}

const deleteImage = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId)
}

module.exports = {uploadImage, deleteImage};