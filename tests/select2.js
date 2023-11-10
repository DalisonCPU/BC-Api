import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function showInfos() {

    const result = await prisma.players_vdata.findMany({
        select: {
         players_variables: {
            select: {
                name: true,
                type: true
            }
         },
         value: true
        },
        where: 
    })
    console.log(result)
}

showInfos()