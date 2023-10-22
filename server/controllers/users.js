import mongoose from "mongoose";
import users from "../models/auth.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find();
    const allUserDetails = [];
    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user._id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        joinedOn: user.joinedOn,
        friends:user.friends
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }

  try {
    const updatedProfile = await users.findByIdAndUpdate(
      _id,
      { $set: { name: name, about: about, tags: tags } },
      { new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

export const updateFriend = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("user unavailable...");
  }

  try {
    const user = await users.findById(userId);
    const Index = user.friends.findIndex((id) => id === String(_id));
    if(Index == -1)
    user.friends.push(_id);
    await users.findByIdAndUpdate(userId, user);
    res.status(200).json({ message: "added friend successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};

export const deleteFriend = async (req, res) => {
  const { id: _id } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("user unavailable...");
  }

  try {
    const user = await users.findById(userId);
    const Index = user.friends.findIndex((id) => id === String(_id));
    if(Index != -1)
    user.friends = user.friends.filter((ele)=> ele !== _id);
    await users.findByIdAndUpdate(userId, user);
    res.status(200).json({ message: "deleted friend successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};
