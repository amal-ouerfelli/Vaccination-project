const { create, getRdv} = require("../repositories/RdvQueries");
var router = require("express").Router();

router.post("/create", async function (req, res) {
    const {
        userId,
        date,
        vaccin,
        centre,
        ville,
        gouvernorat
    } = req.body;
    try {
        const rdv = await create(
            userId,
            date,
            vaccin,
            centre,
            ville,
            gouvernorat
        );

        res.status(201).json({rdv});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});
router.post("/rdvs", async function (req, res) {
    const {
        id
    } = req.body;
    try {
        const rdvs = await getRdv(id);
        res.status(200).json(rdvs);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

module.exports = router ;
