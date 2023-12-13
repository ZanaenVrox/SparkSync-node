import Backimage from '../models/backimage.js';


const createBackimage = async (req, res) =>{
  try {
  const iddd = await Backimage.find().sort({ id: -1 }).limit(1);
  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;
  let backimage;
  if(req.file){
    backimage= req.file.originalname;
  }
      const back_image = await new Backimage ({
       id: incId,
       user_id: req.body.user_id,
       backimage: backimage,
       status: req.body.status,
      });

      const back = await back_image.save();

      res.status(200).json("Image has been uploaded.");
} catch(err){
   res.status(500).json(err);
}
};


const getBackimageDetail = async (req, res) => {
  try{
    
      const id = req.params.id;
      const back_image = await Backimage.findOne({"id":id});
      res.status(200).json(back_image);
  }
  catch (err){
      res.status(500).json(err);
  }
};


const deleteBackimage = async (req, res) => {
  try{
      const id = req.params.id;
      const back_image = await Backimage.deleteOne({"id":id});
      res.status(200).json('Image has been deleted');
  }
  catch (err){
      res.status(500).json(err);
  }
};


const updateBackimage = async (req, res) => {
    try {
      const id  = req.params.id; 
      var backimage;
      if (req.file) {
        backimage = req.file.originalname;
      } else {
        backimage = user.backimage;
      }
      const back_image =  await Backimage.findOne({"id":id});
      back_image.user_id = req.body.use_id;
      back_image.backimage = backimage;
      back_image.status = req.body.status;
      const back = await back_image.save();

      res.status(200).json(back);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getBackimage =  async (req, res) => {
  try {
    const backimage = await Backimage.find().sort({ createdAt: -1 });
    res.status(200).json(backimage);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


const getUserimage =  async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const backimage =  await Backimage.findOne({"user_id":user_id});
    res.status(200).json(backimage);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


const updateStatus = async (req, res) => {
    try{
        const id= req.params.id;
        const data = await Backimage.findOne({"id": id});
        let st = "";
        if(data.status == 1){
          st=0;
        }else{
          st= 1;
        }
        
        var updatedStatus = {status: st };
        
        const updatedstatus = await Backimage.updateOne({"id" : id}, {
        $set: updatedStatus,
        });
        res.status(200).json("Status Updated");
        }
        catch (err)
        {
          res.status(200).json("Status Not Updated");
        }
};

export {createBackimage, deleteBackimage, getBackimage, updateBackimage, getBackimageDetail, updateStatus, getUserimage };