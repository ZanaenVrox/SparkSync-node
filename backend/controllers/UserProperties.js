import UserProperties from "../models/userProperties.js";

const createUserProperty = async (req, res) => {
  try {
    const newUserProperty = await UserProperties.create(req.body);
    res.status(201).json(newUserProperty);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllUserProperties = async (req, res) => {
  try {
    const userProperties = await UserProperties.find();
    res.status(200).json(userProperties);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserPropertyById = async (req, res) => {
  try {
    const userProperty = await UserProperties.findById(req.params.id);
    if (userProperty) {
      res.status(200).json(userProperty);
    } else {
      res.status(404).json({ error: "User property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserPropertyById = async (req, res) => {
  try {
    const updatedUserProperty = await UserProperties.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedUserProperty) {
      res.status(200).json(updatedUserProperty);
    } else {
      res.status(404).json({ error: "User property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user property by ID
const deleteUserPropertyById = async (req, res) => {
  try {
    const deletedUserProperty = await UserProperties.findByIdAndDelete(
      req.params.id
    );
    if (deletedUserProperty) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "User property not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createUserProperty,
  getAllUserProperties,
  getUserPropertyById,
  updateUserPropertyById,
  deleteUserPropertyById,
};
