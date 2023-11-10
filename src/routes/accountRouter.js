import express from "express"
import AccountController from "../controllers/AccountController"

const accountController = new AccountController()
const router = express.Router()

router.get("/login", accountController.getAccount)
router.post("/create", accountController.createAccount)

export default router