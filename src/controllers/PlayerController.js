
import { PrismaClient } from "@prisma/client";
import PlayerControllerWithParams from "./PlayerControllerWithParams.js";

const prisma = new PrismaClient()
const pc=new PlayerControllerWithParams();

class PlayerController {    
async getPlayers(req, res){
    try{

        const plist=req.body;
        const hresult=await pc.getPlayers(null, plist);
        return res.status(hresult.status).json(hresult);

    } catch(err){
    console.log("Erro na classe PlayerController.js\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async createPlayers(req, res){
    try{
    
        const plist=req.body;
        const hresult=await pc.createPlayers(plist);
        return res.status(hresult.status).json(hresult);

    } catch(err){
    console.log("Erro na classe PlayerController.js\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async updatePlayers(req, res){
    try{
    
        const plist=req.body;
        const hresult=await pc.updatePlayers(plist);
        return res.status(hresult.status).json(hresult);

    } catch(err){
    console.log("Erro na classe PlayerController.js\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
    
    async deletePlayers(req, res){
    try{

        const plist=req.body;
        const hresult=await pc.deletePlayers(plist);
        return res.status(hresult.status).json(hresult);

    } catch(err){
    console.log("Erro na classe PlayerController.js\n", err);
    return {status:500, error:"Erro interno do servidor"};
    }
    }
}

export default PlayerController;