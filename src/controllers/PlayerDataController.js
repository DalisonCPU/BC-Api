import { PrismaClient } from "@prisma/client";
import PlayerControllerWithParams from './PlayerDataControllerWithParams.js';

const prisma = new PrismaClient()
const pc = new PlayerControllerWithParams();

class PlayerDataController {

  async createVariables(req, res){
    try{
    const {playerId, vars}=req.body;
    console.log("playerid: ", playerId);
    const result=await pc.createVariables(playerId, vars);
    return res.status(result.status).json(result);
    } catch(err){
    console.log("Erro na classe PlayerDataController:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async updateVariables(req, res){
    try{
    const {playerId, vars}=req.body;
    const result=await pc.updateVariables(playerId, vars);
    return res.status(result.status).json(result);
    } catch(err){
    console.log("Erro na classe PlayerDataController:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async deleteVariables(req, res){
    try{
    const {playerId, vars}=req.body;
    const result=await pc.deleteVariables(playerId, vars);
    return res.status(result.status).json(result);
    } catch(err){
    console.log("Erro na classe PlayerDataController:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async getVariables(req, res){
    try{
    const {playerId, vars}=req.body;
    const result=await pc.getVariables(playerId, vars);
    console.log("O playerId é: ", playerId);
    return res.status(result.status).json(result);
    } catch(err){
    console.log("Erro na classe PlayerDataController:\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }  
}

export default PlayerDataController;