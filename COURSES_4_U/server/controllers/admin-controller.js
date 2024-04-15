const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Services = require("../models/services-model");
//*---------------------------------
//Get all Users logic
//*---------------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error getalluser" });
  }
};

//*---------------------------------
//Update user logic
//*---------------------------------
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {}
};

//*---------------------------------
//Update user logic
//*---------------------------------
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email } = req.body;

    // Check if the email already exists
    const emailExists = await User.exists({ email: email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists!!!!" });
    }

    // If email doesn't exist, proceed with updating the user
    const updatedUserData = req.body;
    const updatedData = await User.updateOne({ _id: id }, {
      $set: updatedUserData
    });

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
}

//*---------------------------------
//Delete user logic
//*---------------------------------
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted the user Successfully" });
  } catch (error) {}
};
//*---------------------------------
//Get all Contacts logic
//*---------------------------------
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

//*---------------------------------
//Delete contact logic
//*---------------------------------
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Deleted the Contact Successfully" });
  } catch (error) {}
};

//*---------------------------------
//Get all Services logic
//*---------------------------------
const getAllServices = async (req, res) => {
  try {
    const services = await Services.find();
    console.log(services);
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No Services found" });
    }
    return res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllContacts,
  getAllServices,
  deleteUser,
  getUserById,
  updateUserById,
  deleteContact
};
