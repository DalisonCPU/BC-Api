import express from "express"
import cors from "cors"
import PlayerRouter from "./src/routes/playerRouter.js"
import AccountRouter from "./src/routes/accountRouter.js"
import PlayerVariableRouter from "./src/routes/PlayerVariableRouter.js"
import PlayerDataRouter from './src/routes/PlayerDataRouter.js';
import e from "express"
import PlayerDataControllerWithParams from "./src/controllers/PlayerDataControllerWithParams.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/account", AccountRouter)
app.use("/api/player", PlayerRouter)
app.use("/api/player/variable", PlayerVariableRouter)
app.use("/api/player/data", PlayerDataRouter)

app.listen(8085, () => {
    console.log(`Servidor ativo`)
    const sf=new PlayerDataControllerWithParams();

})

