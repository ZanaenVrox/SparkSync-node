import Frontimage from "../models/frontimage.js";
import Backimage from "../models/backimage.js";

const createFrontimage = async (req, res) => {
  try {
    console.log(req.body);
    const iddd = await Frontimage.find().sort({ id: -1 }).limit(1);
    let idd = 0;
    if (iddd.length > 0 && iddd[0].id) {
      idd = iddd[0].id;
    }
    var incId = idd + 1;
    let frontimage;
    if (req.file) {
      frontimage = req.file.originalname;
    }
    const front_image = await new Frontimage({
      id: incId,
      user_id: req.body.user_id,
      frontimage: frontimage,
      status: req.body.status,
    });

    const frnt = await front_image.save();

    res.status(200).json("Image has been uploaded.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFrontimageDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const front_image = await Frontimage.findOne({ id: id });
    res.status(200).json(front_image);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteFrontimage = async (req, res) => {
  try {
    const id = req.params.id;
    const front_image = await Frontimage.deleteOne({ id: id });
    res.status(200).json("Image has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateFrontimage = async (req, res) => {
  try {
    const id = req.params.id;
    var frontimage;
    if (req.file) {
      frontimage = req.file.originalname;
    } else {
      frontimage = user.frontimage;
    }
    const front_image = await Frontimage.findOne({ id: id });
    front_image.user_id = req.body.user_id;
    front_image.frontimage = frontimage;
    front_image.status = req.body.status;
    const frnt = await front_image.save();

    res.status(200).json(frnt);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFrontimage = async (req, res) => {
  try {
    const frontimage = await Frontimage.find().sort({ createdAt: -1 });
    res.status(200).json(frontimage);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getUserimage = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);

    // Find all front images for the user
    const front_images = await Frontimage.find({ user_id: user_id });

    // Find all back images for the user
    const back_images = await Backimage.find({ user_id: user_id });

    // Combine front and back images based on created date
    const combinedImages = [];

    front_images.forEach((frontImage) => {
      const correspondingBackImage = back_images.find(
        (backImage) =>
          backImage.createdAt.getDate() === frontImage.createdAt.getDate()
      );

      if (correspondingBackImage) {
        combinedImages.push({
          front_image_url: frontImage.frontimage, // Adjust the property based on your data
          back_image_url: correspondingBackImage.backimage, // Adjust the property based on your data
          created_date: frontImage.createdAt,
        });
      }
    });

    const data = {
      properties: combinedImages,
    };

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Frontimage.findOne({ id: id });
    let st = "";
    if (data.status == 1) {
      st = 0;
    } else {
      st = 1;
    }

    var updatedStatus = { status: st };

    const updatedstatus = await Frontimage.updateOne(
      { id: id },
      {
        $set: updatedStatus,
      }
    );
    res.status(200).json("Status Updated");
  } catch (err) {
    res.status(200).json("Status Not Updated");
  }
};

export {
  createFrontimage,
  deleteFrontimage,
  getFrontimage,
  updateFrontimage,
  getFrontimageDetail,
  updateStatus,
  getUserimage,
};
