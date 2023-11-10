import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class AccountController {
    async getAccount(req, res) {
        const { email, password } = req.query

        try {
            const account = await prisma.account.findUnique({
                where: {
                    email,
                    password,
                },
                select: {
                    language: true,
                    players: {
                        select: {
                            id: true,
                            name: true,
                            gender: true,
                            creationDate: true,
                            playerData: {
                                select: {
                                    variable: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                    value: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!account) {
                return res.status(404).json({ message: "Conta não encontrada" });
            }


            const formattedResult = account.players.map((player) => ({
                name: player.name,
                gender: player.gender,
                creationDate: player.creationDate,
                playerData: player.playerData.map((data) => ({
                    variableName: data.variable.name,
                    value: data.value
                }))
            }))


            return res.status(200).json({
                id: account.id,
                language: account.language,
                formattedResult});

        } catch (error) {
            console.error("Ocorreu um erro:", error)
            return res.status(500).json({ message: "Erro interno do servidor" })
        }
    }

}

export default AccountController