import express from "express"
import PlayerVariableController from "../controllers/PlayerVariableController.js"

const router = express.Router()
const varController = new PlayerVariableController()

router.get("/", varController.getVariables)
router.get("/:listIds", varController.getVariables)
router.put("/update", varController.updateVariable)
router.post("/create", varController.createVariable)
router.delete("/delete/:id", varController.deleteVariable)

export default router