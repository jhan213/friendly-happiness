// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');
var mongoose = require('mongoose');

module.exports = {
  
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async saveSub({ user, body }, res) {
    console.log(body)
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { subscriptions: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteSub({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { subscriptions: { _id: params.subId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async editSub({user, body, params}, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, "subscriptions._id" : params.subId },
      { $set: { "subscriptions.$[i].name" : body.name, "subscriptions.$[i].cost" : body.cost, 
      "subscriptions.$[i].purchaseDate" : body.purchaseDate , "subscriptions.$[i].cycle" : body.cycle} },
      { 
        arrayFilters: [
          { "i._id": params.subId},
        ],
      }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },
};


