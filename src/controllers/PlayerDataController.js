import { PrismaClient } from "@prisma/client";
import PlayerControllerWithParams from './PlayerDataControllerWithParams.js';

const prisma = new PrismaClient()
const pc=new PlayerControllerWithParams();

class PlayerDataController{
  constructor() {
    //this.createVariable = this.createVariable.bind(this);
    this.updateVariable = this.updateVariable.bind(this);
    this.createMultipleVariables = this.createMultipleVariables.bind(this);
    this.updateMultipleVariables = this.updateMultipleVariables.bind(this);
  }

    async createVariable(req, res) {
        try {
          const {playerId, varName, value} = req.body;
      
          const result=await pc.createVariable(playerId, varName, value);
          return res.status(result.status).json(result);
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }

      async updateVariable(req, res) {
        try {
          const { playerId, varName, value } = req.body;
      
          pc.updateVariable(playerId, varName, value);
          return res.status(result.status).json(result);
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }

      async createMultipleVariables(req, res) {
        try {
          const { playerId, vars } = req.body;
      
          if (!playerId) {
            return res.status(400).json({ error: "Nenhum playerId especificado" });
          }
      
          const vPlayer = await prisma.player.findUnique({
            where: {
              id: playerId,
            },
          });
      
          if (!vPlayer) {
            return res.status(400).json({ error: "Nenhum player encontrado com o playerId especificado." });
          }
      
          if (!Array.isArray(vars)) {
            return res.status(400).json({ error: "A entrada deve ser uma lista de variáveis" });
          }
      
          let createdCount = 0;
          const expectedCount=vars.length;
          const errors = [];
      
          for (const variable of vars) {
            const { name, value } = variable;
      
            const result = await pc.createVariable(playerId, name, value);
      
            if (result.status===200) {
              createdCount++;
            } else {
              const jdata={name:name, error: result.error};
              errors.push(jdata)
            }
          }
      
          return res.status(200).json({expectedCount: expectedCount, createdCount: createdCount,  errors: errors });
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }
      
      async updateMultipleVariables(req, res) {
        try {
          const variablesList = req.body;
      
          if (!Array.isArray(variablesList)) {
            return res.status(400).json({ error: "A entrada deve ser uma lista de variáveis" });
          }
      
          let updatedCount= 0;
      
          for (const variable of variablesList) {
            const { playerId, varName, value } = variable;
      
            const result = await pc.updateVariable(playerId, varName, value);
      
            if (result) {
              updatedCount++;
            }
          }
      
          return res.status(200).json({ createdCount });
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }
}

export default PlayerDataController;