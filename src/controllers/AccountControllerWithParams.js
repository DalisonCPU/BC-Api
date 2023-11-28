import { PrismaClient } from "@prisma/client";
import PlayerControllerWithParams from "./PlayerControllerWithParams.js";

const prisma = new PrismaClient()
const hplayer=new PlayerControllerWithParams();

class AccountControllerWithParams{
async createAccounts(alist){
    try{

let accounts=[];

for(const sf of alist){

    const existing=await this.existsAccount(sf.email);
    if(existing.status!==404){
        continue;
    }

const ac=await prisma.account.create({data:{
    email:sf.email,
    password:sf.password,
    language:sf.language
}});

if(sf===null){
    continue;
}

accounts.push({email:ac.email, language:ac.language, creationDate:ac.creationDate.getTime(), lastLogin:ac.lastLogin.getTime()});
}

return {status:200, accounts:accounts};
    }catch(err){
        console.log("Erro na classe AccountControllerWithParams:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async updateAccounts(alist){
    try{

        let accounts=[];

for(const sf of alist){

const existing=await this.existsAccount(sf.email);
if(existing.status!==200){
    continue;
}

const ac=await prisma.account.update({data:{
    language:sf.language,
    lastLogin:Date(sf.lastLogin)
}, where:{
email:sf.email
}});

if(ac===null){
    continue;
}

accounts.push(sf.email);

}

return {status:200, accounts:accounts};

    }catch(err){
        console.log("Erro na classe AccountControllerWithParams:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async deleteAccounts(alist){
    try{

let accounts=[];

for(const email of alist){

    const existing=await this.existsAccount(email);
if(existing.status!==200){
    continue;
}

const ac=await prisma.account.delete({where:{
    email:email
}});

if(ac===null){
    continue;
}

accounts.push(email);

}

return {status:200, accounts:accounts};

    }catch(err){
        console.log("Erro na classe AccountControllerWithParams:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async getAccounts(alist){
    try{

        if((!Array.isArray(alist))||(alist.length===0)){
            return {status:400, error:"Nenhuma lista de contas encontradas."};
        }
        let accounts=[];

        for(const email of alist){

            const existing=await this.existsAccount(email);

if(existing.status!==200){
    continue;
}

const chars=await hplayer.getPlayers(email, []);

const hresult={email:existing.email, language:existing.language};
hresult.creationDate=existing.creationDate.getTime();
hresult.lastLogin=existing.lastLogin.getTime();


if(chars.status===200){
    hresult.chars=chars.chars;
}

accounts.push(hresult);
        }
        
        return {status:200, accounts:accounts};
        
    }catch(err){
        console.log("Erro na classe AccountControllerWithParams:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async existsAccount(email){
    try{
if((email===null)||(email==="")){
    return {status:400,error:"O parâmetro email é inválido"};
}

const hresult=await prisma.account.findUnique({where:{
    email:email
}});

if(hresult===null){
    return {status:404,error:"A conta especificada não existe"};
}

return {status:200, email:hresult.email, password:hresult.password, language:hresult.language, creationDate:hresult.creationDate, lastLogin:hresult.lastLogin};
    } catch(err){
        console.log("Erro na classe AccountControllerWithParams:\n", err);
        return {status:500, error: "Erro interno do servidor"};
    }
}
}

export default AccountControllerWithParams;