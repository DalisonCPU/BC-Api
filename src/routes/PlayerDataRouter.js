import express from "express";
import PlayerDataController from "../controllers/PlayerDataController.js";

const router = express.Router();
const playerDataController = new PlayerDataController();

router.post("/create", playerDataController.createVariable);
router.post("/update", playerDataController.updateVariable);
router.post("/create/multiple", playerDataController.createMultipleVariables);
router.post("/update/multiple", playerDataController.updateMultipleVariables);

export default router;
