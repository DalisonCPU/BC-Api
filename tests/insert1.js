import { PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function addPlayers() {
    const result = await prisma.players.create({
        data: {
            name: "fred",
            password: "12345",
            email: "fred@gmail.com"
        }
    })

    console.log(result)
}

addPlayers()