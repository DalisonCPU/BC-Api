import { PrismaClient } from "@prisma/client";
import PlayerDataControllerWithParams from "./PlayerDataControllerWithParams.js";

const prisma = new PrismaClient()
const hvars=new PlayerDataControllerWithParams();

class PlayerControllerWithParams{
async getPlayers(plist){
    try{

let chars=[];

for(const name of plist){
const ch=await this.existsByName(name);
if(ch.status!==200){
    continue;
}

const vars=await hvars.getVariables(ch.id, []);

if(vars.status!==200){
    continue;
}

const hresult={playerId: ch.id, name:ch.name, accountId:ch.accountId, gener:ch.gender, creationDate:ch.creationDate, lastLogin:ch.lastLogin, vars:vars};
chars.push(hresult);
}

return {status:200, expected:plist.length, count:chars.length, chars:chars};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async updatePlayers(plist){
    try{


    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async createPlayers(plist){
    try{


    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async deletePlayers(plist){
    try{


    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async existsById(id){
    try{
        if((id===null)||(id<=0)){
return {status:400, error: "O parâmetro id é inválido"};
        }

const ch=await prisma.player.findUnique({where:{
    id:id
}});

if(ch===null){
    return {status:404, error:"O player especificado não existe"};
}

return {status:200, id:ch.id, name:ch.name, accountId:ch.accountId, gender:ch.gender, creationDate:ch.creationDate, lastLogin:ch.lastLogin};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async existsByName(name){
    try{
if((name===null)||(name==="")){
    return {status:400, error:"O parâmetro name é inválido"};
}

const ch=await prisma.player.findUnique({where:{
    name:name.toLowerCase()
}});

if(ch===null){
    return {status:404, error: "O player com o nome especificado não existe"};
}

return {status:200, id:ch.id, name:ch.name, accountId:ch.accountId, gender:ch.gender, creationDate:ch.creationDate, lastLogin:ch.lastLogin};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

}

export default PlayerControllerWithParams;