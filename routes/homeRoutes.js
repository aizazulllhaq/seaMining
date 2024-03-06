const { Router } = require("express");
const homeRouter = Router();
const homeController = require('../controllers/homeController');
const { statuscheckMiningPermission } = require("../middlewares/checkMiningPermission");

homeRouter
    .get('/', homeController.getUserDetail)
    .get('/mining', statuscheckMiningPermission, homeController.startMining)

module.exports = homeRouter;