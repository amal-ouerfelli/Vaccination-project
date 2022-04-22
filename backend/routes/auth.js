const { create, SignIn } = require("../repositories/AuthQueries");
var router = require("express").Router();

router.post("/create", async function (req, res) {
    const {
        nom,
        prenom,
        email,
        telephone,
        password,
        ville,
        gouvernorat
    } = req.body;
    try {
        const user = await create(
            nom,
            prenom,
            email,
            telephone,
            password,
            ville,
            gouvernorat
        );
        res.status(201).json({user});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.post("/signin", async function (req, res) {
    const {
        email,
        password,

    } = req.body;
    try {
        const user = await SignIn(
            email,
            password
        );
        res.status(201).json({user});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router ;