require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user-schema');
const Group = require('../models/group-schema');

mongoose.Promise = global.Promise;

/**
 * Represents the Manager for our Databases.
 * This class exposes methods to write, delete and modify data
 * @class DatabaseManager
 */
class DatabaseManager {
  /**
   * The constructor for DatabaseManager
   * @param {Object} params - The parameters containing connection strings to the Databases
   */
  constructor({ mongoURL }) {
    this.mongoURL = mongoURL || process.env.MONGO_URL;
    this.User = User;
    this.Group = Group;
  }

  connectMongo() {
    return mongoose
      .connect(this.mongoURL)
      .then(() => {
        console.log('Mongo connection establised.');
      });
  }

  static disconnectMongo() {
    return mongoose.disconnect().then(() => {
      console.log('Mongo disconnected.');
    });
  }

  connect() {
    return Promise.all([this.connectMongo()]);
  }

  disconnect() {
    return Promise.all([this.disconnectMongo()]);
  }

  /* USERS */

  insertOneUser(user) {
    return new Promise((resolve, reject) => {
      const u = new this.User(user);
      u.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  updateOneUserById(id, user) {
    return new Promise((resolve, reject) => {
      this.User.updateOne({ _id: id }, user, (err, res) => {
        if (err) reject(err);
        else {
          resolve(res);
        }
      });
    });
  }

  findOneUserByFacebookId(facebookId) {
    return new Promise((resolve, reject) => {
      this.User.findOne({ facebookId }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  findUsersByFacebookIds(facebookIds) {
    return new Promise((resolve, reject) => {
      this.User.find({ facebookId: { $in: facebookIds } }, (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }

  /* GROUPS */

  insertOneGroup(group) {
    return new Promise((resolve, reject) => {
      const g = new this.Group(group);
      g.save((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  deleteOneById(id) {
    return new Promise((resolve, reject) => {
      this.Group.deleteOne({ _id: id }, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  findGroupsByUserId(id) {
    return new Promise((resolve, reject) => {
      this.Group.find({ users: { $in: [id] } }, (err, groups) => {
        if (err) reject(err);
        else resolve(groups);
      });
    });
  }

  addUserToGroup(id, userId) {
    return new Promise((resolve, reject) => {
      this.Group.updateOne({ _id: id }, { $addToSet: { users: userId } }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  removeUserFromGroup(id, userId) {
    return new Promise((resolve, reject) => {
      this.Group.updateOne({ _id: id }, { $pull: { users: userId } }, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

module.exports = DatabaseManager;
