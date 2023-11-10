import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function addInDatabase() {
    let data = {
        "hp": 1,
        mana: 1,
        personal_msg: 0
    }

    const entries = Object.entries(data)
    for(const [key, value] of entries) {

        const dbResult = await prisma.players_variables.create({
            data: {
                name: key,
                type: value
            }
        })

        console.log(dbResult)
    }

}

addInDatabase()