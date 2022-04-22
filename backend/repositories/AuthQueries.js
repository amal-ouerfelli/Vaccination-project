const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


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
genToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    "Jpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIi"
  );
};

exports.create = (
  nom,
  prenom,
  email,
  telephone,
  password,
  ville,
  gouvernorat
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (nom === undefined || nom.length === 0) {
        return reject(
          new MissingPrameter("Nom est un champ obligatoire", "nom")
        );
      }
      if (prenom === undefined || prenom.length === 0) {
        return reject(
          new MissingPrameter("Prenom est un champ obligatoire", "prenom")
        );
      }
      if (email === undefined || email.length === 0) {
        return reject(
          new MissingPrameter("Email est un champ obligatoire", "email")
        );
      }
      if (password === undefined || password.length === 0) {
        return reject(
          new MissingPrameter("Password est un champ obligatoire", "password")
        );
      }
      if (telephone === undefined || telephone.length === 0) {
        return reject(
          new MissingPrameter("Telephone est un champ obligatoire", "telephone")
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
      const user = new User();
      user.nom = nom;
      user.prenom = prenom;
      user.email = email;
      user.telephone = telephone;
      user.password = bcrypt.hashSync(password, 10)
      user.ville = ville;
      user.gouvernorat = gouvernorat;

      return user
        .save()
        .then(() => resolve(user))
        .catch((e) => reject(new UnknownError(e.message)));
    } catch (e) {
      return reject(e);
    }
  });

  exports.SignIn = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      User.findOne({ email })
        .exec()
        .then(async(user) => {
            
            const validPassword = await bcrypt.compare(password, user.password);
            if(validPassword){

                resolve(user)            }
            else{
                reject(new UnknownError('mot de passe incorrect'))
            }
        })
        .catch((error) => {
          return reject(error);
        });
    } catch (e) {
      return reject(e);
    }
  });