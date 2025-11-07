const User = require("../models/User");
const { logger } = require("../logger/logger");
const { cloudinary } = require("../config/cloudinary");


//  GET profile picture
exports.getProfilePic = async (req, res, next) => {

  const reqId = req.id;

  try {
    const user = await User.findById(req.user._id).select("profilePic");
    if (!user) return res.status(404).json({ error: true, message: "User not found" });

    logger.info({ reqId, userId: user._id }, "Profile picture retrieved successfully");
    res.json({ error: false, profilePic: user.profilePic });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error fetching profile pic");
    next(err);
  }
};


// PUT upload new profile picture
exports.uploadProfilePic = async (req, res, next) => {

  const reqId = req.id;

  try {
    if (!req.file?.path)
      return res.status(400).json({ error: true, message: "No image uploaded" });

    // Remove old image from Cloudinary if exists
    const user = await User.findById(req.user._id);
    if (user.profilePic) {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`mern-profile-pics/${publicId}`);
    }

    // Save new URL
    user.profilePic = req.file.path;
    await user.save();

    logger.info({ reqId, userId: user._id }, "Profile picture uploaded successfully");

    res.json({
      error: false,
      profilePic: user.profilePic,
      message: "Profile picture uploaded successfully",
    });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error uploading profile pic");
    next(err);
  }
};


//  DELETE  profile picture
exports.deleteProfilePic = async (req, res, next) => {

  const reqId = req.id;

  try {
    const user = await User.findById(req.user._id);

    if (user.profilePic) {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`mern-profile-pics/${publicId}`);
      user.profilePic = "";
      await user.save();
    }

    logger.info({ reqId, userId: user._id }, "Profile picture removed");
    res.json({ error: false, message: "Profile picture removed successfully" });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error removing profile pic");
    next(err);
  }
};



// GET complete profile (data + picture)
exports.getProfile = async (req, res, next) => {

  const reqId = req.id;

  try {
    const user = await User.findById(req.user._id).select(
      "username email profilePic profileData createdAt"
    );

    if (!user)
      return res.status(404).json({ error: true, message: "User not found" });

    logger.info({ reqId, userId: user._id }, "Profile retrieved successfully");
    res.json({ error: false, user });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error fetching profile");
    next(err);
  }
};


// PUT update profile data (name, gender, links, etc.)
exports.updateProfile = async (req, res, next) => {

  const reqId = req.id;

  try {
    const { profileData } = req.body;

    if (!profileData)
      return res.status(400).json({ error: true, message: "No profile data provided" });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileData },
      { new: true }
    ).select("username email profilePic profileData createdAt");

    logger.info({ reqId, userId: updatedUser._id }, "Profile updated successfully");
    res.json({
      error: false,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error updating profile");
    next(err);
  }
};


//delete account
exports.deleteAccount = async (req, res, next) => {

  const reqId = req.id;

  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    // Optional: remove profilePic from Cloudinary
    if (user.profilePic) {
      const publicId = user.profilePic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`mern-profile-pics/${publicId}`);
    }

    await User.findByIdAndDelete(userId);
    logger.info({ reqId, userId }, "User account deleted successfully");
    res.json({ error: false, message: "Account deleted successfully" });
  } 
  catch (err) {
    logger.error({ reqId, error: err.message }, "Error deleting account");
    next(err);
  }
};