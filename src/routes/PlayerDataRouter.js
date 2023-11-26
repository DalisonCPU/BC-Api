import express from "express";
import PlayerDataControllerWithParams from "../controllers/PlayerDataControllerWithParams.js";
import PlayerDataController from "../controllers/PlayerDataController.js";

const router = express.Router();
const playerDataController = new PlayerDataController();

router.post("/create", playerDataController.createVariables);
router.put("/update", playerDataController.updateVariables);
router.delete("/delete", playerDataController.deleteVariables);
router.get("/get", playerDataController.getVariables);

export default router;
