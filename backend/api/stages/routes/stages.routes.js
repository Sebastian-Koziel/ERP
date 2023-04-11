const express = require('express');
const router = express.Router();

const { getAll } = require(`../controllers/stage.controllers`);

//list of all endpoints
router.route("/").get(getAll);
//get all

//get one by id

//new

//update

//delete

module.exports = router;

