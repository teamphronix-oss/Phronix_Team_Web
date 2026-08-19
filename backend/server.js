import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieSession from "cookie-session";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import passport from "./config/passport.js";
import { supabase } from "./config/supabase.js";

import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import downloadRoutes from "./routes/downloads.js";
import adminRoutes from "./routes/admin.js";
import projectRoutes from "./routes/projects.js";
import teamRoutes from "./routes/team.js";
import settingsRoutes from "./routes/settings.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────────────────────
// Core middleware
// ─────────────────────────────────────────────────────────────

app.use(helmet());

app.use(
  morgan(
    process.env.NODE_ENV === "production" ? "combined" : "dev"
  )
);

app.use(express.json({ limit: "1mb" }));

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// ─────────────────────────────────────────────────────────────
// CORS
// Frontend  : http://localhost:5173
// Admin     : http://localhost:5175
// Backend   : http://localhost:5000
// ─────────────────────────────────────────────────────────────

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests that do not have an Origin header
      // such as Postman/server-side requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);

// ─────────────────────────────────────────────────────────────
// Admin/User session cookie
// ─────────────────────────────────────────────────────────────

app.use(
  cookieSession({
    name: "phronix.sid",

    secret: process.env.SESSION_SECRET,

    maxAge: 7 * 24 * 60 * 60 * 1000,

    httpOnly: true,

    // localhost frontend/admin + localhost backend
    // can use this during development.
    sameSite: "lax",

    secure: process.env.NODE_ENV === "production",
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// ─────────────────────────────────────────────────────────────
// Rate limiting
// ─────────────────────────────────────────────────────────────

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ─────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Phronix API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/downloads", downloadRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/team", teamRoutes);

app.use("/api/settings", settingsRoutes);

// ─────────────────────────────────────────────────────────────
// 404 handler
// ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

// ─────────────────────────────────────────────────────────────
// Error handler
// ─────────────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

// ─────────────────────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────────────────────

async function start() {
  try {
    // Check Supabase connection before starting API.
    const { error } = await supabase
      .from("site_settings")
      .select("key")
      .limit(1);

    if (error) {
      throw error;
    }

    console.log("Connected to Supabase");

    app.listen(PORT, () => {
      console.log(`Phronix API running on port ${PORT}`);
      console.log("Allowed frontend origins:");
      console.log("  - http://localhost:5173");
      console.log("  - http://localhost:5175");
    });
  } catch (err) {
    console.error(
      "Failed to start server:",
      err.message
    );

    process.exit(1);
  }
}

start();