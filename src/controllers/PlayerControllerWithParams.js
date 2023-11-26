import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

class PlayerControllerWithParams{
async getPlayers(plist){
    try{


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

return {status:200, id:ch.id, name:ch.name};
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

return {status:200, id:ch.id, name:ch.name};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

}

export default PlayerControllerWithParams;