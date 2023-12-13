import useradmin from '../models/useradmin.js';
import UserAdmin from '../models/useradmin.js';
import bcrypt from 'bcrypt'

const createUser = async (req, res) =>{
  try {
    let encryptedPassword;
    encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const iddd = await UserAdmin.find().sort({ id: -1 }).limit(1);

  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;
  let profile_image;
  if(req.file){
    profile_image= req.file.originalname;
  }
      const users = await new UserAdmin ({
        id: incId,
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        phone_number: req.body.phone_number,
        password: encryptedPassword,
        profile_image: profile_image,
        facebook_profile: req.body.facebook_profile,
        instagram_profile: req.body.instagram_profile,
        linkedin_profile: req.body.linkedin_profile,
        twitter_profile: req.body.twitter_profile,
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
      const user = await UserAdmin.findOne({"id":id});
      res.status(200).json(user);
  }
  catch (err){
      res.status(500).json(err);
  }
};


const deleteUser = async (req, res) => {
  try{
      const id = req.params.id;
      const user = await UserAdmin.deleteOne({"id":id});
      res.status(200).json('Record has been deleted');
  }
  catch (err){
      res.status(500).json(err);
  }
};


const updateUser = async (req, res) => {
    try {
      const id  = req.params.id; 
      const user =  await UserAdmin.findOne({"id":id});
        var encryptedPassword;
        if (req.body.password && req.body.password != '') {
          encryptedPassword = await bcrypt.hash(req.body.password, 10);
        } 
        else {
          var us = await UserAdmin.find({"id":id});
          encryptedPassword = us[0].password;
        }
      
      var profile_image;
      if (req.file) {
        profile_image = req.file.originalname;
      } else {
        profile_image = user.profile_image;
      }
      
      user.username = req.body.username;
      user.email = req.body.email;
      user.name = req.body.name;
      user.address = req.body.address;
      user.phone_number = req.body.phone_number;
      user.password = encryptedPassword;
      user.profile_image = profile_image;
      user.facebook_profile = req.body.facebook_profile,
      user.instagram_profile = req.body.instagram_profile,
      user.linkedin_profile = req.body.linkedin_profile,
      user.twitter_profile = req.body.twitter_profile,
      user.status = req.body.status;
  
      const updateduser = await user.save();
      res.status(200).json(updateduser);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getUser =  async (req, res) => {
  try {
    const user = await UserAdmin.find().sort({ createdAt: -1 });
    res.status(200).json(user);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};


const updateStatus = async (req, res) => {
    try{
        const id= req.params.id;
        const user = await UserAdmin.findOne({"id": id});
        let st = "";
        if(user.status == 1){
          st=0;
        }else{
          st= 1;
        }
        
        var updatedStatus = {status: st };
        
        const updatedstatus = await UserAdmin.updateOne({"id" : id}, {
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