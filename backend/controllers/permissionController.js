import Permission from '../models/permission.js';


const createPermission = async (req, res) =>{
  try {
  const iddd = await Permission.find().sort({ id: -1 }).limit(1);
  let idd = 0;
  if (iddd.length > 0 && iddd[0].id) {
    idd = iddd[0].id;
  }
  var incId = idd + 1;
      const permission = await new Permission ({
        id: incId,
        permission: req.body.permission,
        status: req.body.status,      
      });

      const obj = await permission.save();
      res.status(200).json("Record has been added...");
    }
   catch(err){
   res.status(500).json(err);
}
};

const getPermissionDetail = async (req, res) => {
  try{
      const id = req.params.id;
      const pr = await Permission.find({"id":id});
      res.status(200).json(pr);
  }
  catch (err){
      res.status(500).json(err);
  }
};

const deletePermission = async (req, res) => {
  try{
      const id = req.params.id;
      const permission = await Permission.deleteOne({"id":id});
      res.status(200).json('Record has been deleted');
  }
  catch (err){
      res.status(500).json(err);
  }
};

const updatePermission = async (req, res) => {
    try {
      
      const id  = req.params.id; 
      const pr =  await Permission.findOne({"id":id});
        pr.permission = req.body.Permission;
        pr.status = req.body.status;
  
      const rl = await pr.save();
      
      res.status(200).json("Record has been updated...");
    
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getPermission =  async (req, res) => {
  try {
    const pr = await Permission.find();
    res.status(200).json(pr);
  } 
  catch (err) {
    res.status(500).json(err);
  }
};

const updateStatus = async (req, res) => {
    try{
        const id= req.params.id;
        const pr = await Permission.findOne({"id": id});
        let st = "";
        if(pr.status == 1){
          st=0;
        }else{
          st= 1;
        }
        
        var updatedStatus = {status: st };
        
        const updatedstatus = await Permission.updateOne({"id" : id}, {
        $set: updatedStatus,
        });
        res.status(200).json("Status Updated");
        }
        catch (err)
        {
          res.status(200).json("Status Not Updated");
        }
};

export {createPermission, deletePermission, getPermissionDetail, updatePermission, getPermission, updateStatus };