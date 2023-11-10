import { PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

async function addPlayers() {

    const result = await prisma.account.create({
        data: {
            email: "test@gmail.com",
            password: "test123",
            language: "en",
            players: {
                create: {
                    name: "test",
                    gender: 0,
                    playerData: {
                        create: {
                            variable: {
                                create: {
                                    name: "segurando",
                                    type: 0,
                                }
                            },
                            value: "Carambola",
                        },
                    },
                },
            },
        },
    })

    console.log(result)
}

addPlayers()