import express from "express"
import PlayerVariableController from "../controllers/PlayerVariableController.js"

const router = express.Router()
const varController = new PlayerVariableController()

router.get("/", varController.getVariables)
router.get("/get", varController.getVariables)
router.put("/update", varController.updateVariables)
router.post("/create", varController.createVariables)
router.delete("/delete", varController.deleteVariables)

export default router