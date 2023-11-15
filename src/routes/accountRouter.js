import express from "express"
import AccountController from "../controllers/AccountController.js"

const accountController = new AccountController()
const router = express.Router()

router.post("/login", accountController.getAccount)
router.post("/create", accountController.createAccount)

export default router