import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

class AccountController {
    async getAccount(req, res) {

        try {
          const { email, password } = req.query
          if((email==null)||(email==="")||(password==null)||(password==="")){
            return res.status(400).json({error:"Verifique o json enviado. Um ou mais parâmetros são inválidos"})
          }
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
                return res.status(404).json({error: "Conta não encontrada ou senha inválida" });
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
                players:formattedResult});

        } catch (error) {
            console.error("Ocorreu um erro:", error)
            return res.status(500).json({error: "Erro interno do servidor" })
        }
    }

    async createAccount(req, res) {
        
        try {
          const { email, password, language } = req.body; // Certifique-se de que os dados da nova conta estão presentes no corpo da solicitação.
          if((!isValidEmail(email))||(password==null)||(password==="")||(language==null)||(language==="")){
            return res.status(400).json({error:"verifique o json enviado. Um ou mais parâmetros são inválidos"})
          }
          const existingAccount = await prisma.account.findUnique({
            where: {
              email,
            },
          });
    
          if (existingAccount) {
            return res.status(400).json({error: "Já existe uma conta com esse email" });
          }
    
          const newAccount = await prisma.account.create({
            data: {
              email,
              password,
              language,
            },
          });
    
          return res.status(200).json({
            id: newAccount.id,
            email: newAccount.email,
            language: newAccount.language,
          });
        } catch (error) {
          console.error("Ocorreu um erro:", error);
          return res.status(500).json({error: "Erro interno do servidor" });
        }
      }
    
}

export default AccountController