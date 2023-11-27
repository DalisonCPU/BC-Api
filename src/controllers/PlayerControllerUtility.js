import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class PlayerControllerUtility{
    async playerExistsById(id){
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
    
    async playerExistsByName(name){
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

export default PlayerControllerUtility;