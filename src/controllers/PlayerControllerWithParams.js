import { PrismaClient } from "@prisma/client";
import PlayerControllerUtility from "./PlayerControllerUtility.js";
import PlayerDataControllerWithParams from "./PlayerDataControllerWithParams.js";

const prisma = new PrismaClient()
const hpUtility=new PlayerControllerUtility();
const hvars=new PlayerDataControllerWithParams();

class PlayerControllerWithParams{
async getPlayers(plist){
    try{

let chars=[];

for(const name of plist){
const ch=await hpUtility.playerExistsByName(name);
if(ch.status!==200){
    continue;
}

const vars=await hvars.getVariables(ch.id, []);

if(vars.status!==200){
    continue;
}

const hresult={playerId: ch.id, name:ch.name, accountId:ch.accountId, gener:ch.gender, creationDate:ch.creationDate, lastLogin:ch.lastLogin, vars:vars.vars};
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

}

export default PlayerControllerWithParams;