import express from "express"
import PlayerController from "../controllers/PlayerController.js"

const router = express.Router()
const playerController = new PlayerController()

router.get("/:name", playerController.getPlayer)
//router.get("/", playerController.getPlayers)
router.post("/create", playerController.createPlayer)
router.delete("/delete/:id", playerController.deletePlayer)

export default router