import { PrismaClient } from "@prisma/client";
import PlayerVariableControllerWithParams from './PlayerVariableControllerWithParams.js';

const prisma = new PrismaClient();
const vc=new PlayerVariableControllerWithParams();

class PlayerVariableController {
  async createVariables(req, res){
    try{
const result=await vc.createVariables(req.body);
return res.status(result.status).json(result);
    }catch(err){
      console.log("Erro ao tratar a requisição:\n", err);
      return {status:500, error:"Erro interno do servidor"};
    }
  }

  async updateVariables(req, res){
    try{
const result=await vc.updateVariables(req.body);
return res.status(result.status).json(result);
    }catch(err){
      console.log("Erro ao tratar a requisição:\n", err);
      return {status:500, error:"Erro interno do servidor"};
    }
  }
  
  async deleteVariables(req, res){
    try{
const result=await vc.deleteVariables(req.body);
return res.status(result.status).json(result);
    }catch(err){
      console.log("Erro ao tratar a requisição:\n", err);
      return {status:500, error:"Erro interno do servidor"};
    }
  }
  
  async getVariables(req, res){
    try{
const result=await vc.getVariables(req.body);
return res.status(result.status).json(result);
    }catch(err){
      console.log("Erro ao tratar a requisição:\n", err);
      return {status:500, error:"Erro interno do servidor"};
    }
  }
  }

export default PlayerVariableController;
