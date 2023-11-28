import express from "express"
import AccountController from "../controllers/AccountController.js"

const accountController = new AccountController()
const router = express.Router()

router.get("/get", accountController.getAccounts)
router.post("/create", accountController.createAccounts)
router.put("/update", accountController.updateAccounts)
router.delete("/delete", accountController.deleteAccounts)

export default router