import express from "express"
import cors from "cors"
import playerRoutes from "./src/routes/player.js"
import accountRoutes from "./src/routes/account.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/account", accountRoutes)
app.use("/api/player", playerRoutes)

app.listen(8085, () => {
    console.log(`Servidor ativo`)
})