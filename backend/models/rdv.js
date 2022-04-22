const mongoose = require("mongoose");
const { dbConnection } = require("../config/db");

const rdvSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: "",
  },
  centre: {
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
  vaccin: {
    type: String,
    default: "",
  },
});
rdvSchema.index({ "$**": "text" });

module.exports = dbConnection.model("Rdv", rdvSchema);
