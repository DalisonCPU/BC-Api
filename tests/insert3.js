import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function addInDatabase() {

    const data = [
        [1, 1, '1500.00'],
        [1, 2, '750.00'],
        [1, 3, 'Como pode 5*5*0.2 ser 5?']
    ]

    for (let obj of data) {
        const result = await prisma.players_vdata.create({
            data:{
                playerId: obj[0],
                varId: obj[1],
                value: obj[2]
            } 
        })
        console.log(result)
    }
    
}

addInDatabase()