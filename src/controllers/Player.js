import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PlayerController {

    async getPlayers(req, res) {
        const result = await prisma.players.findMany()
        res.status(200).json({
            status: "success",
            message: "List of players",
            player_list: result
        })

    }

    async getPlayer(req, res) {

        const { name } = req.params

        if (name == null) {
            return res.status(500).json({
                status: "error",
                message: "Missing name"
            })
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
            return res.status(404).json({
                status: "not found",
                message: "Player not found"
            })
        }

        const props = {}

        for (const vdata of player.vData) {
            props[vdata.variable.name] = vdata.value
        }

        const jsonResult = {
            id: player.id,
            name: player.name,
            password: player.password,
            email: player.email,
            props: props,
        }
        return res.status(200).json(jsonResult)
    }


    async createPlayer(req, res) {

        const { name, password, email, props } = req.body

        let player
        try {
            player = await prisma.players.create({
                data: {
                    name,
                    password,
                    email
                }
            })
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: `Failed to create player: ${err.message}`
            })
        }

        for (const [key, value] of Object.entries(props)) {
            let variable = await prisma.players_variables.create({
                data: {
                    name: key
                }
            })
            if (!variable) {
                return res.status(500).json({
                    status: "error",
                    message: "Unable to create variable in player"
                })

            }
            await prisma.players_vdata.create({
                data: {
                    playerId: player.id,
                    varId: variable.id,
                    value: String(value)
                }
            })
        }

        res.status(200).json({
            status: "success",
            message: "Player created successfull"
        })

    }


    async deletePlayer(req, res) {

        let { id } = req.params

        if (!id) {
            return res.status(500).json({
                status: "error",
                message: "Micing id"
            })
        }

        id = Number(id)

        let result = await prisma.players.findUnique({
            where: {
                id
            }
        })

        if (!result) {
            return res.status(404).json({
                status: "not found",
                message: "Player not found"
            })
        }

        try {
            result = await prisma.players.delete({
                where: {
                    id: Number(id)
                }
            })
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: `Error when deleteing player: ${err.message}`
            })
        }
    }
}

export default PlayerController