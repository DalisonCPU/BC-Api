import express from "express"
import AccountController from "../controllers/Account.js"

const accountController = new AccountController()
const router = express.Router()

router.get("/login", accountController.getAccount)

export default router