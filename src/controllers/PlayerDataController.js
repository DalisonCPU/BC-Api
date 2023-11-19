import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PlayerDataController{
  constructor() {
    // Vincule os métodos internos ao objeto da instância
    this.internalcreateVariable = this.internalcreateVariable.bind(this);
    this.internalUpdateVariable = this.internalUpdateVariable.bind(this);
    this.createVariable = this.createVariable.bind(this);
    this.updateVariable = this.updateVariable.bind(this);
    this.createMultipleVariables = this.createMultipleVariables.bind(this);
    this.updateMultipleVariables = this.updateMultipleVariables.bind(this);
    this.getVariableId = this.getVariableId.bind(this);
    this.playerVariableExists = this.playerVariableExists.bind(this);
  }

    async createVariable(req, res) {
        try {
          const {playerId, varName, value} = req.body;
      
          const result=await this.internalcreateVariable(playerId, varName, value);
      
        if((result)&&(result.error)){
          return res.status(400).json(result);
        }
        else if(!result){
          return res.status(500).json({error: "Erro interno do servidor."});
        }
        else{
          return res.status(200).json(result);
        }
          return res.status(200).json(result);
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }

      async updateVariable(req, res) {
        try {
          const { playerId, varName, value } = req.body;
      
          const result = await this.internalUpdateVariable(playerId, varName, value);
      
          if (!result) {
            return res.status(500).json({ error: "Erro ao atualizar a variável" });
          }
      
          return res.status(200).json(result);
        } catch (err) {
          console.log("Erro: ", err);
          return res.status(500).json({ error: "Erro interno do servidor." });
        }
      }

      async createMultipleVariables(req, res) {
        try {
          const variablesList = req.body;
      
          if (!Array.isArray(variablesList)) {
            return res.status(400).json({ error: "A entrada deve ser uma lista de variáveis" });
          }
      
          let createdCount = 0;
      
          for (const variable of variablesList) {
            const { playerId, varName, value } = variable;
      
            const result = await this.internalcreateVariable(playerId, varName, value);
      
            if((result)&&(!result.error)){
              createdCount++;
            }
          }
      
          return res.status(200).json({vars: createdCount });
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
      
            const result = await this.internalUpdateVariable(playerId, varName, value);
      
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
      
    //Internal

    async internalcreateVariable(playerId, varName, value) {
      try {
        const varId = await this.getVariableId(varName);
    
        if (!varId) {
          return {error:"A variável não existe."};
        }
    
const vplayer=await prisma.player.findFirst({
where:{
  id:playerId
}
});

if(!vplayer){
  return {error:"O jogador especificado não existe."};
}

if(playerVariableExists(playerId, varId)){
  return {error:"A variável especificada já existe no player."};
}

        const nvar = await prisma.PlayerData.create({
          data: {
            value: value,
            player: {
              connect: {
                id: playerId,
              },
            },
            variable: {
              connect: {
                id: varId,
              },
            },
          },
        });
    
        return nvar ? nvar : null;
      } catch (err) {
        console.log("Ocorreu um erro ao criar a variável em playerdata. ", err);
        return null;
      }
    }
    
    
async internalUpdateVariable(playerId, varName, value) {
    try {
      const varId = await this.getVariableId(varName);
  
      if (!varId) {
        return null;
      }
  
if(!playerVariableExists(playerId, varId)){
return {error:"A variável especificada não existe no player."};
}

      // Atualize os dados do jogador usando o ID da variável
      const updatedVar = await prisma.PlayerData.update({
        where: {
          playerId_varId: {
            playerId: playerId,
            varId: varId,
          },
        },
        data: {
          value: value,
        },
      });
  
      return updatedVar;
    } catch (err) {
      console.log("Ocorreu um erro ao atualizar a variável em playerdata. ", err);
      return null;
    }
  }
  
async getVariableId(var_name) {
    try {
      // Execute a função do banco de dados usando $queryRaw
      const result = await prisma.$queryRaw`SELECT get_variable_id(${var_name}) AS id`;
if(!result){
    return null;
}
      
      // Obtenha o ID da variável do resultado
      const varId = result[0]?.id;

      if (!varId) {
return null;
      }

return varId;
    } catch (error) {
      console.error("Erro ao obter ID da variável:", error);
return null;
    }
  }

async playerVariableExists(playerId, varId){
    try{
    const vp=await prisma.findFirst({
where:{
  playerId:playerId,
  varId:varId
}
    });
    return vp ? vp : null;
  } catch(err){
    console.log("Um erro aconteceu: ", err);
    return null;
  }
  }
}

export default PlayerDataController;