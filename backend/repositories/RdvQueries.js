const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Rdv = require("../models/rdv");


class MissingPrameter extends Error {
    constructor(message, param) {
        super(message);
        this.name = 'MissingPrameter';
        this.code = 422;
        this.param = param;
    }
}
class UnknownError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnknownError';
        this.code = 500;
    }
}


exports.create = (
  userId,
  date,
  vaccin,
  centre,
  ville,
  gouvernorat,
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (date === undefined || date.length === 0) {
        return reject(
          new MissingPrameter("Date est un champ obligatoire", "date")
        );
      }
      if (centre === undefined || centre.length === 0) {
        return reject(
          new MissingPrameter("Centre est un champ obligatoire", "centre")
        );
      }
      if (vaccin === undefined || vaccin.length === 0) {
        return reject(
          new MissingPrameter("Vaccin est un champ obligatoire", "vaccin")
        );
      }
      if (ville === undefined || ville.length === 0) {
        return reject(
          new MissingPrameter("Ville est un champ obligatoire", "ville")
        );
      }
      if (gouvernorat === undefined || gouvernorat.length === 0) {
        return reject(
          new MissingPrameter(
            "Gouvernorat est un champ obligatoire",
            "gouvernorat"
          )
        );
      }
      const rdv = new Rdv();
      rdv.date = date;
      rdv.vaccin = vaccin;
      rdv.centre = centre;
      rdv.ville = ville;
      rdv.gouvernorat = gouvernorat;

      return rdv
        .save()
        .then(() => {
          User.findById(userId)
          .exec()
          .then((user) =>{ 
            user.rdv=user.rdv.push(rdv._id.valueOf())
            user.rdv=[...new Set(user.rdv)]
          resolve(rdv)})})
        .catch((e) => reject(new UnknownError(e.message)));}
     catch (e) { return reject(e);}
    
  });

  exports.getRdv = (userId) =>
  new Promise((resolve, reject) => {
    try {
      User.findById(userId)
        .populate("rdv")
        .exec()
        .then((user) =>
          user
            ? resolve(user.rdv)
            : reject(
                new ElementNotFound(
                  "There is no user registered with the provided id."
                )
              )
        )
        .catch((error) =>
          reject(
            new UnknownError(
              `Unexpected error server side using code ${error.code}`
            )
          )
        );
    } catch (err) {
      return reject(
        new UnknownError(`Unexpected error server side using code ${err.code}`)
      );
    }
  });

         