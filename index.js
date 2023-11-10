import express from "express"
import cors from "cors"
import PlayerRouter from "./src/routes/playerRouter.js"
import AccountRouter from "./src/routes/accountRouter.js"
import VariableRouter from "./src/routes/VariableRouter.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/account", AccountRouter)
app.use("/api/player", PlayerRouter)
app.use("/api/variable", VariableRouter)

app.listen(8085, () => {
    console.log(`Servidor ativo`)
})