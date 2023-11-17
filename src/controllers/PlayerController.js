import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PlayerController {

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
        const { name, password, email, props } = req.body;
    
        let player;
        try {
            player = await prisma.players.create({
                data: {
                    name,
                    password,
                    email
                }
            });
        } catch (err) {
            return res.status(500).json({ error: "Erro ao criar o player" });
        }
    
        for (const [key, value] of Object.entries(props)) {
            try {
                const variableIdResult = await prisma.$executeRaw`SELECT get_variable_id(${key}) AS id`;
    
                if (variableIdResult && variableIdResult.length > 0) {
                    const variableId = variableIdResult[0].id;
    
                    await prisma.players_vdata.create({
                        data: {
                            playerId: player.id,
                            varId: variableId,
                            value: String(value)
                        }
                    });
                } else {
                    return res.status(500).json({ error: "Erro ao criar variável do player" });
                }
            } catch (error) {
                console.error('Erro ao chamar a função get_variable_id:', error);
                return res.status(500).json({ error: "Erro ao criar variável do player" });
            }
        }    
        res.status(200).json({});
    }
    
    
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
                const variable = await prisma.players_variables.findUnique({
                    where: {
                        name: key,
                    },
                });

                if (!variable) {
                    // Crie uma nova variável se ela não existir
                    await prisma.players_variables.create({
                        data: {
                            name: key,
                        },
                    });
                }

                // Atualize o valor da variável
                await prisma.players_vdata.upsert({
                    where: {
                        playerId_varId: {
                            playerId: parseInt(id),
                            varId: variable.id,
                        },
                    },
                    update: {
                        value: String(value),
                    },
                    create: {
                        playerId: parseInt(id),
                        varId: variable.id,
                        value: String(value),
                    },
                });
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