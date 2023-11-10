import express from "express"
import VariableController from "../controllers/VariableController.js"

const router = express.Router()
const varController = new VariableController()

router.get("/:id", varController.getVariable)
router.put("/update", varController.updateVariable)
//router.get("/", VariableController.getPlayers)
router.post("/create", varController.createVariable)
router.delete("/delete/:id", varController.deleteVariable)

export default router