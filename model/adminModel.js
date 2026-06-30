const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const adminSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
