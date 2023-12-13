import User from '../models/user.js';
import bcrypt from 'bcrypt'

const createUser = async (req, res) =>{
  try {
    let encryptedPassword;
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const iddd = await User.find().sort({ id: -1 }).limit(1);

  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;
  let profile_image;
  if(req.file){
    profile_image= req.file.originalname;
  }
      const users = await new User ({
        id: incId,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        password: encryptedPassword,
        profile_image: profile_image,
        // otp: req.body.otp,
        // isVerified: req.body.isVerified,
        status: req.body.status,
      });

      const user = await users.save();
      res.status(200).json("User has been added...");
} catch(err){
   res.status(500).json(err);
}
};


const getUserDetail = async (req, res) => {
  try{
    
      const id = req.params.id;
      const user = await User.findOne({"id":id});
      res.status(200).json(user);
  }
  catch (err){
      res.status(500).json(err);
  }
};


const deleteUser = async (req, res) => {
  try{
      const id = req.params.id;
      const user = await User.deleteOne({"id":id});
      res.status(200).json('Record has been deleted');
  }
  catch (err){
      res.status(500).json(err);
  }
};


const updateUser = async (req, res) => {
  try {
    
      var encryptedPassword;
      const id  = req.params.id; 
      var userr =  await User.findOne({"id":id});
    //.log("user", user);
      if (req.body.password && req.body.password != '') {
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
      } 
      else {
        var us = await User.find({"id":id});
        encryptedPassword = us[0].password;
      }
    
    
    var profile_image;
    if (req.file) {
      profile_image = req.file.originalname;
    } else {
      profile_image = userr.profile_image;
    }
    
    console.log('sad',encryptedPassword);
   
    userr.email = req.body.email;
    userr.name = req.body.name;
    userr.password = encryptedPassword;
    userr.profile_image = profile_image;
    userr.address = req.body.address;
    userr.phone_number = req.body.phone_number;
    userr.status = req.body.status;

   
    console.log("User");
    var updateduser = await userr.save();
    console.log("Useruu", updateduser);
    res.status(200).json(updateduser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser =  async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


const updateStatus = async (req, res) => {
    try{
        const id= req.params.id;
        const user = await User.findOne({"id": id});
        let st = "";
        if(user.status == 1){
          st=0;
        }else{
          st= 1;
        }
        
        var updatedStatus = {status: st };
        
        const updatedstatus = await User.updateOne({"id" : id}, {
        $set: updatedStatus,
        });
        res.status(200).json("Status Updated");
        }
        catch (err)
        {
          res.status(200).json("Status Not Updated");
        }
};

export {createUser, deleteUser, getUser, updateUser, getUserDetail, updateStatus };