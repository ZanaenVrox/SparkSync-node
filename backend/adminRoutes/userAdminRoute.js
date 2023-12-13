import express from 'express';
import {createUser, deleteUser, getUser, updateUser, getUserDetail, updateStatus }  from '../controllers/useradminController.js';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: "public/uploads/userAdmin",

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


const userAdminRouter = express.Router();


userAdminRouter.route('/').get(getUser);
userAdminRouter.route('/create').post(upload.single("profile_image"), createUser);
userAdminRouter.route('/details/:id').get(getUserDetail);
userAdminRouter.route('/update/:id').post(upload.single("profile_image"), updateUser);
userAdminRouter.route('/delete/:id').get(deleteUser);
userAdminRouter.route('/status/:id').post(updateStatus);

 

export default userAdminRouter;
 