import express from 'express';
import {createBackimage, deleteBackimage, getBackimage, updateBackimage, getBackimageDetail, updateStatus, getUserimage }  from '../controllers/backimageController.js';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: "public/uploads/backimages",

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


const backimageRouter = express.Router();


backimageRouter.route('/').get(getBackimage);
backimageRouter.route('/:user_id').get(getUserimage);
backimageRouter.route('/create').post(upload.single("backimage"), createBackimage);
backimageRouter.route('/details/:id').get(getBackimageDetail);
backimageRouter.route('/update/:id').post(upload.single("backimage"), updateBackimage);
backimageRouter.route('/delete/:id').get(deleteBackimage);
backimageRouter.route('/status/:id').post(updateStatus);

 

export default backimageRouter;
 