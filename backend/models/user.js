const mongoose = require("mongoose");
const { dbConnection } = require("../config/db");

const userSchema = new mongoose.Schema({
  nom: {
    type: String,
    default: "",
  },
  prenom: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  ville: {
    type: String,
    default: "",
  },
  gouvernorat: {
    type: String,
    default: null,
  },
  rdv: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Rdv",
      default: null,
    },
  ],
});
userSchema.index({ "$**": "text" });

module.exports = dbConnection.model("User", userSchema);
