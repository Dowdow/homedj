const mongoose = require('mongoose');

/** Group Schema */
const groupSchema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Group', groupSchema);
