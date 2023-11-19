import { PrismaClient } from "@prisma/client";
import PlayerDataController from "./PlayerDataController.js";
const prisma = new PrismaClient()


class PlayerController {
    constructor() {
        this.playerDataController = new PlayerDataController();
      }
    
    

    async getPlayers(req, res) {
        const result = await prisma.players.findMany()
        res.status(200).json({
            code:200,
            msg:"Sucesso",
            player_list: result
        })

    }

    async getPlayer(req, res) {
        const { name } = req.params
        if (name == null) {
            return res.status(400).json({error:"Faltando nome"})
        }

        const player = await prisma.players.findUnique({
            where: {
                name: name,
            },
            include: {
                vData: {
                    include: {
                        variable: true,
                    },
                },
            },
        })

        if (!player) {
            return res.status(404).json({error:"Player não encontrado"})
        }

        const props = {}

        for (const vdata of player.vData) {
            props[vdata.variable.name] = vdata.value
        }

        const jsonResult = {
            code:200,
            msg:"Sucesso",
            id: player.id,
            name: player.name,
            password: player.password,
            email: player.email,
            props: props,
        }
        return res.status(200).json(jsonResult)
    }

    async createPlayer(req, res) {
        try {

            const { name, password, email, language, props } = req.body;

            if(!email){
            return res.status(400).json({error:"Conta não indicada para associar o novo player."});
            }

    const account=await prisma.account.findUnique({
        where:{
            email:email
        }
    });

    if(!account){
        return res.status(400).json({error:"A conta especificada não existe."});
    }

            let player;
                player = await prisma.player.create({
                    data: {
                        name,
                        password,
                        language,
                    account:{
                        connect:{
                            email:email
                        }
                    }
                    },
                });
            
            for (const [key, value] of Object.entries(props)) {
                    const result = await this.playerDataController.internalcreateVariable(player.id, key, value);
    
                    if (result && result.error) {
                        return res.status(500).json({ error: "Erro ao criar variável do player" });
                    }
            }
    
            return res.status(200).json({});
        } catch (error) {
            console.error("Um erro aconteceu ao criar o player. ", error);
            return res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
    
      // Outros métodos da classe
    
      async savePlayer(req, res) {
        const { id } = req.params;
        const { name, password, email, props } = req.body;
    
        if (!id) {
          return res.status(400).json({ error: "Faltando id" });
        }
    
        try {
          const player = await prisma.players.findUnique({
            where: {
              id: parseInt(id),
            },
          });
    
          if (!player) {
            return res.status(404).json({ error: "Player não encontrado" });
          }
    
          // Atualize os valores do jogador
          const updatedPlayer = await prisma.players.update({
            where: {
              id: parseInt(id),
            },
            data: {
              name,
              password,
              email,
            },
          });
    
          // Atualize as variáveis do jogador
          for (const [key, value] of Object.entries(props)) {
            const result = await this.playerDataController.internalUpdateVariable(player.id, key, value);
    
            if (!result) {
              // Lidere com erro ao atualizar variável
              return res.status(500).json({ error: "Erro ao atualizar variável do player" });
            }
          }
    
          res.status(200).json({
            code: 200,
            msg: "Sucesso",
            id: updatedPlayer.id,
            name: updatedPlayer.name,
            password: updatedPlayer.password,
            email: updatedPlayer.email,
          });
        } catch (err) {
          console.error("Ocorreu um erro:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }
      }
        
    async deletePlayer(req, res) {

        let { id } = req.params

        if (!id) {
            return res.status(400).json({error:"Faltando id"})
        }

        id = Number(id)

        let result = await prisma.players.findUnique({
            where: {
                id
            }
        })

        if (!result) {
            return res.status(404).json({error:"Player não encontrado"})
        }

        try {
            result = await prisma.players.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch (err) {
            return res.status(500).json({error:"Erro interno do servidor"})
        }
    }
}

export default PlayerController;