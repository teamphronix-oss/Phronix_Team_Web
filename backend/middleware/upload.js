import multer from "multer";
import cloudinary from "../config/cloudinary.js";

// Files land in memory only — never written to local disk — then streamed
// straight to Cloudinary. This replaces the old disk-storage multer setup
// that saved images under backend/uploads/.
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

// Uploads a single in-memory buffer to Cloudinary under phronix/<folder>/.
// Resolves { url, publicId } — publicId is stored alongside the URL so the
// old image can be cleanly deleted later on update/removal.
export function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `phronix/${folder}`, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// Best-effort delete — never throws, since a failed cleanup shouldn't block
// the API response (an orphaned Cloudinary asset is a minor cost, a broken
// update/delete request is not).
export async function deleteImage(publicId) {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete failed:", err.message);
  }
}

export default { upload, uploadBuffer, deleteImage };
