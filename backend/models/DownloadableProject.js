import mongoose from "mongoose";

// Stores only a bcrypt HASH if a project needs its own password, plus the
// server-local file path. Neither the hash nor the path is ever sent to
// the client — see routes/downloads.js.
const downloadableProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // matches frontend data/downloads.js id
    name: { type: String, required: true },
    version: { type: String },
    filename: { type: String, required: true }, // filename inside PROTECTED_FILES_DIR
    passwordHash: { type: String }, // optional, bcrypt hash only
    requiresAuth: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("DownloadableProject", downloadableProjectSchema);
