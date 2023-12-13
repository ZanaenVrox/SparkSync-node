import express from "express";
import multer from "multer";
import {
  createUserProperty,
  getAllUserProperties,
  getUserPropertyById,
  updateUserPropertyById,
  deleteUserPropertyById,
} from "../controllers/UserProperties.js";

const storage = multer.diskStorage({
  destination: "public/uploads/userproperties",
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
  storage: storage,
});

const userPropertyRouter = express.Router();

// Get all user properties
userPropertyRouter.route("/").get(getAllUserProperties);

// Create a new user property
userPropertyRouter.route("/create").post(
  upload.fields([
    { name: "front_image", maxCount: 1 },
    { name: "back_image", maxCount: 1 },
  ]),
  createUserProperty
);

// Get user property by ID
userPropertyRouter.route("/details/:id").get(getUserPropertyById);

// Update user property by ID
userPropertyRouter.route("/update/:id").post(
  upload.fields([
    { name: "front_image", maxCount: 1 },
    { name: "back_image", maxCount: 1 },
  ]),
  updateUserPropertyById
);

// Delete user property by ID
userPropertyRouter.route("/delete/:id").get(deleteUserPropertyById);

// Additional route examples (you can replace these with your actual routes)
// userPropertyRouter.route('/status/:id').post(updateStatus);

export default userPropertyRouter;
