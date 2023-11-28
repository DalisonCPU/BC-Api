import express from "express"
import PlayerController from "../controllers/PlayerController.js"

const router = express.Router()
const playerController = new PlayerController()

router.get("/get", playerController.getPlayers)
router.post("/create", playerController.createPlayers)
router.put("/update", playerController.updatePlayers)
router.delete("/delete", playerController.deletePlayers)

export default router