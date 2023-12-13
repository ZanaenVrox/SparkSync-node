import express from "express";
import {
  createFrontimage,
  deleteFrontimage,
  getFrontimage,
  updateFrontimage,
  getFrontimageDetail,
  updateStatus,
  getUserimage,
} from "../controllers/frontimageController.js";
import multer from "multer";

var storage = multer.diskStorage({
  destination: "public/uploads/frontimages",

  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },

  storage: storage,
});

const frontimageRouter = express.Router();

frontimageRouter.route("/").get(getFrontimage);
frontimageRouter.route("/:user_id").get(getUserimage);
frontimageRouter
  .route("/create")
  .post(upload.single("frontimage"), createFrontimage);
frontimageRouter.route("/details/:id").get(getFrontimageDetail);
frontimageRouter
  .route("/update/:id")
  .post(upload.single("frontimage"), updateFrontimage);
frontimageRouter.route("/delete/:id").get(deleteFrontimage);
frontimageRouter.route("/status/:id").post(updateStatus);

export default frontimageRouter;
