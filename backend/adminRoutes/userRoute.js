import express from 'express';
import {createUser, deleteUser, getUser, updateUser, getUserDetail, updateStatus }  from '../controllers/userController.js';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: "public/uploads/user",

  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({
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


const userRouter = express.Router();


userRouter.route('/').get(getUser);
userRouter.route('/create').post(upload.single("profile_image"), createUser);
userRouter.route('/details/:id').get(getUserDetail);
userRouter.route('/update/:id').post(upload.single("profile_image"), updateUser);
userRouter.route('/delete/:id').get(deleteUser);
userRouter.route('/status/:id').post(updateStatus);

 

export default userRouter;
 