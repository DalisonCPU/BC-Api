import { PrismaClient } from "@prisma/client";
import AccountControllerWithParams  from "./AccountControllerWithParams.js";

const prisma = new PrismaClient()
const hcon=new AccountControllerWithParams();

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

class AccountController {
  async getAccounts(req, res) {
    try {

const result=await hcon.getAccounts(req.body);
return res.status(result.status).json(result);
    } catch (error) {
      console.error("Ocorreu um erro:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }

  async createAccounts(req, res) {

    try {

const result=await hcon.createAccounts(req.body);
      return res.status(result.status).json(result);
          }      catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

async updateAccounts(req, res){
try{

const result=await hcon.updateAccounts(req.body);
return res.status(result.status).json(result);

} catch(err){
console.log("Erro na classe AccountController:\n", err);
return {status:500, error:"Erro interno do servidor"};
}
}

async deleteAccounts(req, res){
try{

const result=await hcon.deleteAccounts(req.body);
return res.status(result.status).json(result);

} catch(err){
console.log("Erro na classe AccountController:\n", err);
return {status:500, error:"Erro interno do servidor"};
}
}
}

export default AccountController