const express = require('express');
const {dbConnection} = require('./config/db');
const app= express();
const cors = require('cors');
// const bearerStrategy = require('./middlewares/strategies/bearerStrategy')
// const CONF = require("./static");
const passport = require("passport");
var path = require('path');
var public = path.join(__dirname, 'public');
//Connect DB
dbConnection;
;

app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(`/user/auth/`,  require('./routes/auth'));
app.use(`/user/rdv/`,  require('./routes/rdv'));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// bearerStrategy()



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})



