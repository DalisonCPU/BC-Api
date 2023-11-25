import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


class PlayerDataControllerWithParams {

  async getVariable(playerId, varName) {
    try {
      const res = await this.getVariableId(varName);
      if (res.status !== 200) {
        return res;
      }

      const varId=parseInt(res.id)

      const vr = await prisma.PlayerData.findUnique({
        where: {
          playerId_variableId: {
            playerId: playerId,
            variableId: varId
          }
        }
      });
      if (vr === null) {
        return { status: 404, error: "Variável não encontrada" };
      }
      else {
        vr.name=varName;
        return { status: 200, var: vr };
      }
    } catch (err) {
      console.log("Um erro aconteceu: ", err);
      return { status: 500, error: "Erro interno do servidor" };
    }
  }

async getMultipleVariables(playerId, varList){
  try{
if(!Array.isArray(varList)){
return {status:400, error:"Nenhuma lista de variáveis indicada."};
}

const vplayer=await prisma.player.findUnique({where:{
  id: playerId
}});

if(vplayer===null){
  return {status:400, error: "O id do player é inválido"};
}

if(varList.length===0){
  const vars=await prisma.PlayerData.findMany({
where:{
  playerId:playerId
},
include:{
  variable: true
}
  });
let results=[];
for(const v of vars){
  results.push([v.variable.name,v.value])
}
return {status:200, vars: results};
}
else{
  let results=[];
  for(const vname of varList){
    const vr=await this.getVariable(playerId, vname);
    if(vr.status===200){
    results.push([vr.var.name, vr.var.value]);
  }
  }
  return {status:200, vars:results};
}
  } catch (err){
    console.log("Aconteceu um erro ao recuperar múltiplas variáveis: ", err);
    return {status:500, error:"Erro interno do servidor"};
  }
}

async deleteVariables(playerId, varList){
try{

if(!Array.isArray(varList)){
  return {status:400, error:"Nenhum array encontrado."};
}

if(varList.length===0){
  return {status:400,error:"Nenhuma variável especificada para a exclusão"};
}

const vplayer=await prisma.findUnique({where:{
  id:playerId
}});

if(vplayer===null){
return {status:404, error:"O player com o id especificado não existe."};
}

let deleteds=0;

for(const vr of varList){
  const varIdResult = await this.getVariableId(varName);

  if (varIdResult.status === 200) {
    const varId = parseInt(varIdResult.id);

    // Excluir a variável associada ao jogador
    const deleteResult = await prisma.playerData.deleteMany({
      where: {
        playerId_variableId: {
          playerId: playerId,
          variableId: varId,
        },
      },
    });

    // Atualizar a contagem de deleteds
    deleteds += deleteResult.count;
  }
}

return {status:200, count:deleteds};

}catch(err){
  console.log("Erro ao deletar variáveis de jogadores:\n", err);
  return {status:500, error:"Erro interno do servidor"};
}
}

  async createVariable(playerId, varName, value) {
    try {
      const jvar = await this.getVariableId(varName);

      if (jvar.status !== 200) {
        return jvar;
      }

      const varId = parseInt(jvar.id);

      const vplayer = await prisma.player.findFirst({
        where: {
          id: playerId
        }
      });

      if (vplayer===null) {
        return { status: 404, error: "O jogador especificado não existe." };
      }

      if ((await this.playerVariableExists(playerId, varId)).status === 200) {
        return { status: 400, error: "A variável especificada já existe no player." };
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

      if (nvar) {
        return { status: 200, var: nvar };
      }
      else {
        return { status: 400, error: "Erro ao criar a variável." };
      }
    } catch (err) {
      console.log("Ocorreu um erro ao criar a variável em playerdata. ", err);
      return { status: 500, error: "Erro interno do servidor" };
    }
  }

async createMultipleVariables(playerId, varList){
  try{
if((!Array.isArray(varList))||(varList.length===0)){
  return {status:400, error:"Lista de variáveis não encontrada, ou está vazia."};
}

const vplayer=await prisma.player.findUnique({where:{
  id:playerId
}});

if(vplayer===null){
  return {status:404,error:"O player especificado não existe"};
}

let results=[];

for(const vr of varList){
const varId=this.getVariableId(playerId, vr[0]);
if(varId.status!==200){
  continue;
}
if(await this.playerVariableExists(playerId, varId.id)!==200){
continue;
}

const nvar = await prisma.PlayerData.create({
  data: {
    value: vr[1],
    player: {
      connect: {
        id: playerId,
      },
    },
    variable: {
      connect: {
        id: varId.id,
      },
    },
  },
});

if (nvar) {
  results.push([vr[0], vr[1]]);
}

}

const rs= {status:200, expected:varList.length, created: results.length, vars:results};
console.log("resultset:\n", rs);
return rs;
  }catch(err){
    console.log("Um erro aconteceu durante a criação de múltiplas variáveis:\n", err);
    return {status:500, error:"Erro interno do servidor"};
  }
}

 async updateVariable(playerId, varName, value) {
    try {
      const varId = await this.getVariableId(varName);

      if (!varId) {
        return null;
      }

      if (!playerVariableExists(playerId, varId)) {
        return { error: "A variável especificada não existe no player." };
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
      if (!result) {
        return { status: 404, error: "Variável não existe" };
      }

      // Obtenha o ID da variável do resultado
      const varId = result[0]?.id;

      return { status: 200, id: varId };
    } catch (error) {
      console.error("Erro ao obter ID da variável:", error);
      return { status: 500, error: "Erro interno do servidor" };
    }
  }

  async playerVariableExists(playerId, varId) {
    try {
      const vp = await prisma.playerData.findUnique({
        where: {
          playerId_variableId: {
            playerId,
            variableId: varId
          }
        }
      });
      if (vp !== null) {
        return { status: 200 };
      }
      else {
        return { status: 404, error: "A variável não existe no jogador." };
      }
    } catch (err) {
      console.log("Um erro aconteceu: ", err);
      return { status: 500, error: "Erro interno do servidor" };
    }
  }
}

export default PlayerDataControllerWithParams;