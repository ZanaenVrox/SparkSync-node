import Role from "../models/role.js";
import RoleHasPermission from "../models/rolehaspermission.js";

const createRoles = async (req, res) => {
  try {
    const iddd = await Role.find().sort({ id: -1 }).limit(1);
    let idd = 0;
    if (iddd.length > 0 && iddd[0].id) {
      idd = iddd[0].id;
    }
    var incId = idd + 1;
    const roles = await new Role({
      id: incId,
      user_id: req.body.user_id,
      title: req.body.title,
      status: req.body.status,
    });

    const obj = await roles.save();
    const pr = req.body.permission;
    let permission = [];

    for (var i = 0; i < pr.length; i++) {
      var inp = {
        role_id: obj.id,
        permission_id: pr[i],
      };
      permission.push(inp);
    }
    const rpr = await RoleHasPermission.create(permission);
    res.status(200).json("Record has been added...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRolesDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = await Role.find({ id: id });
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteRoles = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = await Role.deleteOne({ id: id });
    res.status(200).json("Record has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateRoles = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = await Role.findOne({ id: id });
    roles.user_id = req.body.user_id;
    roles.title = req.body.title;
    roles.status = req.body.status;

    const rl = await roles.save();
    if (rl){
      await RoleHasPermission.deleteMany({role_id : req.params.id})
    
    //res.json(rl.id);
    const pr = req.body.permission;
    let permission = [];
    for (var i = 0; i < pr.length; i++) {
      var inp = {
        role_id: rl.id,
        permission_id: pr[i],
      };
      permission.push(inp);
    }
    //res.json(permission);
      const rpr = await RoleHasPermission.create(permission);
      res.status(200).json("Record has been updated...");
  }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getRolePermission = async (req, res) => {
  try {
    const role_id = req.params.role_id;
    const rolepermission = await RoleHasPermission.find({role_id: role_id});
    res.status(200).json(rolepermission);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const roles = await Role.findOne({ id: id });
    let st = "";
    if (roles.status == 1) {
      st = 0;
    } else {
      st = 1;
    }

    var updatedStatus = { status: st };

    const updatedstatus = await Role.updateOne(
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
  createRoles,
  deleteRoles,
  getRolesDetail,
  updateRoles,
  getRoles,
  updateStatus,
  getRolePermission
};
