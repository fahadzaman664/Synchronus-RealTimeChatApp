// src/api/uploadFileApi.js
import axios from "axios";
import { UPLOAD_FILE_ROUTE } from "@/utils/constant";
import { HOST } from "@/utils/constant";

export const uploadFileApi = async (formData, onUploadProgress) => {
  try {
    const response = await axios.post(
      `${HOST}${UPLOAD_FILE_ROUTE}`,
      formData,
      {
        withCredentials: true, // same as credentials: "include"
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress, // ✅ progress callback
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
