// src/utils/uploadMedia.ts
import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadToCloudinary(file: File, type: 'image' | 'video') {
  if (!file) throw new Error('File is missing');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);

  const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${type}/upload`;

  const res = await axios.post(apiUrl, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.secure_url as string;
}
