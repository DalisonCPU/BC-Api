import { PrismaClient } from "@prisma/client";
import PlayerControllerUtility from "./PlayerControllerUtility.js";
import PlayerDataControllerWithParams from "./PlayerDataControllerWithParams.js";

const prisma = new PrismaClient()
const hpUtility=new PlayerControllerUtility();
const hvars=new PlayerDataControllerWithParams();

class PlayerControllerWithParams{
    async getPlayers(email, plist) {
        try {
          // Verificar se email e plist não estão vazios ao mesmo tempo
          if ((!email && !plist) || (email === "" && plist.length === 0)) {
            return { status: 400, error: "Email e plist não podem estar vazios ao mesmo tempo." };
          }
      
          let chars = [];
      
          // Caso o email esteja vazio ou nulo, recuperar a lista de jogadores especificada em plist
          if (!email) {
            for (const name of plist) {
              const ch = await hpUtility.playerExistsByName(name);
              if (ch.status !== 200) {
                continue;
              }
      
              const vars = await hvars.getVariables(ch.id, []);
      
              if (vars.status !== 200) {
                continue;
              }
      
              const hresult = {
                playerId: ch.id,
                name: ch.name,
                accountId: ch.accountId,
                gener: ch.gender,
                creationDate: ch.creationDate.getTime(),
                lastLogin: ch.lastLogin.getTime(),
                vars: vars.vars
              };
              chars.push(hresult);
            }
          } else {
            // Caso o email seja válido, recuperar todos os players cujo o accountId seja igual ao email
            const players = await prisma.account
              .findUnique({
                where: { email },
              })
              .players();
      
            for (const player of players) {
              const vars = await hvars.getVariables(player.id, []);
      
              if (vars.status !== 200) {
                continue;
              }
      
              const hresult = {
                playerId: player.id,
                name: player.name,
                accountId: player.accountId,
                gender: player.gender,
                creationDate: player.creationDate.getTime(),
                lastLogin: player.lastLogin.getTime(),
                vars: vars.vars,
              };
              chars.push(hresult);
            }
          }
      
          return { status: 200, expected: plist.length, count: chars.length, chars: chars };
        } catch (err) {
          console.log("Erro ao recuperar um player:\n", err);
          return { status: 500, error: "Erro interno do servidor" };
        }
      }
      
async updatePlayers(plist){
    try{

        let updateds=[];

for(const ch of plist){
    const  existing=await hpUtility.playerExistsByName(ch.name);
    if((await existing).status!==200){
        continue;
    }

const hresult= await prisma.player.update({
    data:{
        gender:ch.gender,
lastLogin:Date(ch.lastLogin)
    }, where:{
        id:existing.id
    }
});

if(hresult===null){
    continue;
}

hresult=await hvars.updateVariables(existing.id, ch.vars);

if(hresult.status!==200){
    continue;
}

updateds.push(ch.name);
}


        return {status:200, expected:plist.length, count:updateds.length, chars:updateds};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async createPlayers(plist){
    try{

let chars=[];

for(const ch of plist){
    const existing=await hpUtility.playerExistsByName(ch.name);

    if(existing.status!==404){
        continue;
    }

    const hresult=await prisma.player.create({
        data:{
            name:ch.name,
            gender:ch.gender,
            account:{
                connect:{
                    email:ch.accountId
                }
            }
        }
    });

    if(hresult===null){
        continue;
    }
    
const hresult2=await hvars.createVariables(hresult.id, ch.vars);

if(hresult2.status===200){
ch.id=hresult.id;
ch.vars=hresult2.vars;
}

ch.creationDate=hresult.creationDate.getTime();
ch.lastLogin=hresult.lastLogin.getTime();

chars.push(ch);
}

return {status:200, expected:plist.length, count:chars.length, chars:chars};

    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async deletePlayers(plist){
    try{

        let chars=[];

for(const ch of plist){

    const existing=await hpUtility.playerExistsByName(ch);

    if(existing.status!==200){
        continue;
    }

    const hresult=await prisma.player.delete({where:{
        id:existing.id
    }});

    if(hresult===null){
        continue;
    }

    chars.push(ch);
}

        return {status:200, expected:plist.length,count:chars.length, chars:chars};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}
}

export default PlayerControllerWithParams;