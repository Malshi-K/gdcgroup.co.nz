import formidable from "formidable";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

// Disable Next.js built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const accessTokenId = process.env.NEXT_PUBLIC_FILE_MANAGER_ACCESS_TOKEN;
const fileUploadUrl = process.env.NEXT_PUBLIC_HUBSPOT_FILE_UPLOAD_URL;

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("File parsing error:", err);
      return res.status(500).json({ message: "Error parsing files." });
    }

    const uploadedFiles = Object.values(files).flat();

    try {
      // Upload files to HubSpot and collect URLs
      const fileUrls = await Promise.all(
        uploadedFiles.map(async (file) => {
          // Create a FormData instance to handle the file upload correctly
          const formData = new FormData();
          formData.append("file", fs.createReadStream(file.filepath), {
            filename: file.originalFilename,
          });

          // Set additional required fields for HubSpot
          formData.append(
            "options",
            JSON.stringify({ access: "PUBLIC_NOT_INDEXABLE" })
          );
          formData.append("folderPath", "/uploads"); // Specify the correct folder path

          // Upload the file to HubSpot
          const response = await axios.post(fileUploadUrl, formData, {
            headers: {
              Authorization: `Bearer ${accessTokenId}`,
              ...formData.getHeaders(),
            },
          });

          return response.data.url; // Extract and return the URL of the uploaded file
        })
      );

      // Respond with the uploaded file URLs
      res.status(200).json({ url: fileUrls });
    } catch (fileError) {
      console.error(
        "Error uploading to HubSpot:",
        fileError.response?.data || fileError.message
      );
      res.status(500).json({ message: "Error uploading files to HubSpot." });
    }
  });
};

export default handler;
