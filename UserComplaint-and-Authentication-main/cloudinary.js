// cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'complaints', // folder in Cloudinary
    allowed_formats: ['jpg','jpeg','png','webp','bmp','tiff'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }]
  }
});

module.exports = { cloudinary, storage };
