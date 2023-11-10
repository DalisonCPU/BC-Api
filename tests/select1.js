import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function showInfos() {

    const result = await prisma.players_vdata.findMany({
        select: {
            value: true,
            variable: {
                select: {
                    name: true,
                    type: true
                }
            }
        }
    });

    console.log(result);
}

fetchData();
