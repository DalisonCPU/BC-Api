import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PlayerVariableController {
  async createVariable(req, res) {
    try {      
      const  {name, type} = req.body;
      if((!name)||(type==null)){
return res.status(400).json({error:"Um ou mais parâmetros são inválidos. Verifique o json enviado."});
      }
const variable=await prisma.playerVariable.findFirst({
where:{
name:name
}
}
);
if(variable){
  return res.status(400).json({error:"Uma variável com este nome já existe."});
}
     
//Adiciona a nova variável...
const new_var=await prisma.playerVariable.create({
data:{
name,
type
}
});

if(new_var){
  return res.status(200).json({
id:new_var.id,
name:new_var.name,
type:new_var.type
  });
}
else{
  return res.status(500).json({error:"Não oi possível criar a variável no momento"});
}
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({error: "Erro interno do servidor" });
    }
  }

  async updateVariable(req, res) {
    try {
      const { id, name, type } = req.body;
if((name==null)||(name==="")||(type==null)||(type<0)||(id==null)||(id<=0)){
  return res.status(400).json({error:"Verifique o json enviado. Alguns parâmetros são inválidos"});
}
      const updatedVariable = await prisma.playerVariable.update({
        where: {
          id,
        },
        data: {
          name,
          type,
        },
      });

      return res.status(200).json({
        id: updatedVariable.id,
        name: updatedVariable.name,
        type: updatedVariable.type,
      });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({error: "Erro interno do servidor" });
    }
  }

  async deleteVariable(req, res) {
    try {
      const id = parseInt(req.params.id)
if((id==null)||(id<=0)){
  return res.status(400).json({error:"Id inválido"})
}
      await prisma.playerVariable.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({id: id});
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({error: "Erro interno do servidor" });
    }
  }

  async getVariables(req, res) {
    try {
      let listIds = req.params.listIds;

      if (!listIds) {
const vars=await prisma.playerVariable.findMany();
return res.status(200).json(vars);
      }

      listIds = listIds.split(",").map(id => parseInt(id, 10));

      const variables = await prisma.playerVariable.findMany({
        where: {
          id: {
            in: listIds
          }
        },
      });

      if (!variables || variables.length === 0) {
        return res.status(404).json({error: "Variáveis não encontradas" });
      }

      const variableList = variables.map(variable => ({
        id: variable.id,
        name: variable.name,
        type: variable.type,
      }));

      return res.status(200).json(
        variableList,
      );
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({error: "Erro interno do servidor" });
    }
  }
}

export default PlayerVariableController;
