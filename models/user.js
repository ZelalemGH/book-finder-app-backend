const mongoose = require("mongoose")
// const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema(
  {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: {
     createdAt: "created_at",
     updatedAt: "updated_at"
  }
}
);

// UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', UserSchema);
