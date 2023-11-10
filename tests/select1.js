import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function showInfos() {

    const result = await prisma.account.findMany({
        include: {
            players: {
                include: {
                    playerData: true
                }
            }
        }
    })
    console.log(JSON.stringify(result))
}

showInfos()
