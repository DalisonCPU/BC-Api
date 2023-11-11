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
                return res.status(404).json({ code:404, msg: "Conta não encontrada" });
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
              code:200,
              msg:"Sucesso",
                id: account.id,
                language: account.language,
                formattedResult});

        } catch (error) {
            console.error("Ocorreu um erro:", error)
            return res.status(500).json({ code:500, msg: "Erro interno do servidor" })
        }
    }
    async createAccount(req, res) {
        const { email, password, language } = req.body; // Certifique-se de que os dados da nova conta estão presentes no corpo da solicitação.
    
        try {
          const existingAccount = await prisma.account.findUnique({
            where: {
              email,
            },
          });
    
          if (existingAccount) {
            return res
              .status(400)
              .json({code:400,  msg: "Já existe uma conta com esse email" });
          }
    
          const newAccount = await prisma.account.create({
            data: {
              email,
              password,
              language,
            },
          });
    
          return res.status(200).json({
            code:200,
            msg:"Sucesso",
            id: newAccount.id,
            email: newAccount.email,
            language: newAccount.language,
          });
        } catch (error) {
          console.error("Ocorreu um erro:", error);
          return res.status(500).json({code:500,  msg: "Erro interno do servidor" });
        }
      }
    
}

export default AccountController