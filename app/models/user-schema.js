const mongoose = require('mongoose');

/** User Schema */
const userSchema = new mongoose.Schema({
  name: String,
  facebookId: String,
  picture: String,
});

module.exports = mongoose.model('User', userSchema);
