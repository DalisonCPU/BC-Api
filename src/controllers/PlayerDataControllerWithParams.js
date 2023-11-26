import { PrismaClient } from "@prisma/client";
import PlayerControllerWithParams from './PlayerControllerWithParams.js';
import PlayerVariableControllerWithParams from './PlayerVariableControllerWithParams.js';

const prisma = new PrismaClient()
const pc=new PlayerControllerWithParams();
const vc=new PlayerVariableControllerWithParams();

class PlayerDataControllerWithParams {

  async getVariables(playerId, vlist){
    try{

      if(!Array.isArray(vlist)){
      return {status:400, error:"Nenhuma lista de variáveis indicada."};
      }

      const playerExists=await pc.existsById(playerId);
      if(playerExists.status!=200){
        return {status:400, error: "O id do player é inválido"};
      }
      
      if(vlist.length===0){
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
      return {status:200, expected: results.length, count:results.length, vars: results};
      }
      else{
        let results=[];
        for(const vname of vlist){
          const vr=await this.existsPlayerVariable(playerId, vname);
          if(vr.status===200){
          results.push([vr.variableName, vr.value]);
        }
        }
        return {status:200, expected: vlist.length, count:results.length, vars:results};
      }
        } catch (err){
          console.log("Aconteceu um erro ao recuperar múltiplas variáveis: ", err);
          return {status:500, error:"Erro interno do servidor"};
        }      
    }

    async updateVariables(playerId, vlist) {
      try {
        if (!Array.isArray(vlist) || vlist.length === 0) {
          return { status: 400, error: "Nenhuma lista de variáveis indicada." };
        }
    
        const playerExists = await pc.existsById(playerId);
        if (playerExists.status !== 200) {
          return { status: 400, error: "O jogador com o id especificado não existe" };
        }
    
        let updateds = [];
    
        for (const [vname, value] of vlist) {
          const vpdata = await this.existsPlayerVariable(playerId, vname);
          if (vpdata.status !== 200) {
            continue;
          }
    
          const updatedVar = await prisma.playerData.update({
            data: {
              value: value,
            },
            where: {
              playerId_variableId:{
                playerId:playerId,
                variableId:vpdata.variableId
              }
              
            },
          });
    
          if (updatedVar !== null) {
            updateds.push(vname);
          }
        }
    
        return { status: 200, expected: vlist.length, count: updateds.length, vars: updateds };
    
      } catch (err) {
        console.log("Erro interno:\n", err);
        return { status: 500, error: "Erro interno do servidor" };
      }
    }
    
        
    async createVariables(playerId, vlist) {
      try {
        if (!Array.isArray(vlist) || vlist.length === 0) {
          return { status: 400, error: "Nenhuma lista de variáveis indicada." };
        }
    
        
        const playerExists = await pc.existsById(playerId);
    
        if (playerExists.status !== 200) {
          return { status: 400, error: "O jogador com o id especificado não existe" };
        }
    
        let vars = [];
    
        for (const [vname, value] of vlist) {
          const vpdata = await this.existsPlayerVariable(playerId, vname);
    
          if ((vpdata.status === 200)||(!vpdata.variableId)) {
            continue;
          }
    
          const result = await prisma.playerData.create({
            data: {
              value: value,
              player: {
                connect: {
                  id: playerId,
                },
              },
              variable: {
                connect: {
                  id: vpdata.variableId,
                },
              },
            },
          });
    
          if (result !== null) {
            vars.push([vname, value]);
          }
        }
    
        return { status: 200, expected: vlist.length, count: vars.length, vars: vars };
    
      } catch (err) {
        console.log("Erro interno:\n", err);
        return { status: 500, error: "Erro interno do servidor" };
      }
    }
    
    async deleteVariables(playerId, vlist){
    try {

      if((!Array.isArray(vlist))||(vlist.length===0)){
        return {status:400, error:"Nenhuma lista de variáveis indicada."};
        }

        const playerExists=await pc.existsById(playerId);

        if(playerExists.status!==200){
          return {status:400, error:"O jogador com o id especificado não existe"};
        }

let vars=[];

for(const vname of vlist){
  const result=await this.existsPlayerVariable(playerId, vname);
  if(result.status!==200){
    continue;
  }

const res=await prisma.PlayerData.delete({where:{
  playerId_variableId:{
    playerId:playerId,
    variableId:result.variableId
  }
}});

if(res!==null){
  vars.push(vname);
}
}

        return {status:200, expected: vlist.length, count:vars.length, vars:vars};
    }catch(err){
    console.log("Erro interno:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async existsPlayerVariable(playerId, variableName){
    try {
   const pdata=await pc.existsById(playerId);
const vdata=await vc.existsByName(variableName);

if((pdata.status!==200)||(vdata.status!=200)){
  return {status:400, error:"O jogador ou a variável indicados não existem"};
}

const vpdata=await prisma.playerData.findUnique({where:{
playerId_variableId:{
  playerId:playerId,
  variableId:vdata.id
}
}});

if(vpdata===null){
  return {status:404, error: "A variável especificada não existe no player", variableId:vdata.id};
}

return {status:200, playerId:playerId, variableId:vdata.id, variableName:vdata.name, value:vpdata.value };
    }catch(err){
    console.log("Erro interno:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
  }  
}

export default PlayerDataControllerWithParams;