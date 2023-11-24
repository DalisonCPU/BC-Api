import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PlayerDataControllerWithParams{
constructor    (){
//this.createVariable = this.createVariable.bind(this);
    //this.updateVariable = this.updateVariable.bind(this);
    //this.playerVariableExists=this.playerVariableExists.bind(this);
}

async getVariable(playerId, varName){
try{
const res=await this.getVariableId(varName);
if(res.status!==200){
    return res;
}

const vr=await     prisma.PlayerData.findUnique({where:{
player_variable:{
    playerId: playerId,
    variableId:varId
}
}});
if(vr===null){
    return {status: 404, error: "Variável não encontrada"};
}
else{
    return {status:200, var:vr};
}
} catch(err){
    console.log("Um erro aconteceu: ", err);
    return {status: 500, error: "Erro interno do servidor"};
}
}

    async createVariable(playerId, varName, value) {
        try {
          const jvar = await this.getVariableId(varName);
      
          if (jvar.status!==200) {
            return {status: 404, error:"A variável não existe."};
          }
      
          const varId=parseInt(jvar.id);

  const vplayer=await prisma.player.findFirst({
  where:{
    id:playerId
  }
  });
  
  if(!vplayer){
    return {status: 404, error:"O jogador especificado não existe."};
  }
  
  if(await this.playerVariableExists(playerId, varId).id===200){
    return {status: 400, error:"A variável especificada já existe no player."};
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
      
          if(nvar){
return {status: 200, var:nvar};
          }
          else{
            return {status: 400, error: "Erro ao criar a variável."};
          }
        } catch (err) {
          console.log("Ocorreu um erro ao criar a variável em playerdata. ", err);
          return {status: 500, error:"Erro interno do servidor"};
        }
      }
      
static   async updateVariable(playerId, varName, value) {
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
      return {status: 404, error: "Variável não existe"};
  }
        
        // Obtenha o ID da variável do resultado
        const varId = result[0]?.id;
  
return {status:200, id: varId};
      } catch (error) {
        console.error("Erro ao obter ID da variável:", error);
return {status:500, error: "Erro interno do servidor"};
      }
    }
  
    static  async playerVariableExists(playerId, varId) {
      try {
          const vp = await prisma.playerData.findUnique({
              where: {
                  playerId_variableId: {
                      playerId,
                      variableId: varId
                  }
              }
          });
          if(vp!==null){
            return {status:200};
          }
          else{
            return {status:404, error: "A variável não existe no jogador."};
          }
      } catch (err) {
          console.log("Um erro aconteceu: ", err);
          return {status:500, error: "Erro interno do servidor"};
      }
  }
}

export default PlayerDataControllerWithParams;