import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class PlayerVariableControllerWithParams {
  async createVariables(vlist) {
    try {
      if (!Array.isArray(vlist) || vlist.length === 0) {
        return { status: 400, error: "Nenhuma lista de variáveis indicada." };
      }

      const createdVariables = [];
      for (const [name, type] of vlist) {
        const existingVar = await this.getVariableId(name);
        if (existingVar.status === 200) {
          // A variável já existe
          continue;
        } else {
          const newVar = await prisma.PlayerVariable.create({
            data: {
              name,
              type,
            },
          });
          createdVariables.push([newVar.id, newVar.name, newVar.type]);
        }
      }

      return {status:200, expected:vlist.length, count:createdVariables.length, vars:createdVariables};
    } catch (err) {
      console.log("Erro ao criar variáveis: ", err);
      return { status: 500, error: "Erro interno do servidor." };
    }
  }

  async updateVariables(vlist) {
    try {
      if (!Array.isArray(vlist) || vlist.length === 0) {
        return { status: 400, error: "Nenhuma lista de variáveis indicada." };
      }

      const updatedVariables = [];
      for (const [name, type] of vlist) {
        const existingVar = await this.getVariableId(name);
        if (existingVar.status !==200) {
          // A variável não existe
          continue;
        } else {
          const updatedVar = await prisma.PlayerVariable.update({
            where: { id: existingVar.id },
            data: { type },
          });
updatedVariables.push([name, type]);
        }
      }

      return {status:200, expected:vlist.length, count:updatedVariables.length, vars:updatedVariables};
    } catch (err) {
      console.log("Erro ao atualizar variáveis: ", err);
      return { status: 500, error: "Erro interno do servidor." };
    }
  }

  async deleteVariables(vlist) {
    try {
      if (!Array.isArray(vlist) || vlist.length === 0) {
        return { status: 400, error: "Nenhuma lista de variáveis indicada." };
      }

      const deletedVariables = [];
      for (const name of vlist) {
        const existingVar = await this.getVariableId(name);
        if (existingVar.status !==200) {
          // A variável não existe
          continue;
        } else {
          await prisma.PlayerVariable.delete({ where: { id: existingVar.id } });
          deletedVariables.push(name);
        }
      }

      return {status:200, expected: vlist.length, count: deletedVariables.length, vars:deletedVariables};
    } catch (err) {
      console.log("Erro ao deletar variáveis: ", err);
      return { status: 500, error: "Erro interno do servidor." };
    }
  }

  async getVariables(vlist) {
    try {
      if (!Array.isArray(vlist)) {
        return { status: 400, error: "Nenhuma lista de variáveis indicada." };
      }

      const retrievedVariables = [];
      for (const name of vlist) {
        const existingVar = await this.getVariableId(name);
        if (existingVar.status !==200) {
          // A variável não existe
          continue;
        } else {
          const vr=await prisma.PlayerVariable.findUnique({where:{
            id:existingVar.id
          }});

          retrievedVariables.push([vr.id, vr.name, vr.type]);
        }
      }

      return {status:200, expected: vlist.length, count:retrievedVariables.length, vars:retrievedVariables};
    } catch (err) {
      console.log("Erro ao obter variáveis: ", err);
      return { status: 500, error: "Erro interno do servidor." };
    }
  }

  async getVariableId(var_name) {
    try {
      const result = await prisma.$queryRaw`SELECT id FROM tbl_playervariable WHERE name = ${var_name}`;
      if (!result || result.length === 0) {
        return { status: 404, error: "Variável não existe" };
      }

      const varId = result[0]?.id;

      return { status: 200, id: varId };
    } catch (error) {
      console.error("Erro ao obter ID da variável:", error);
      return { status: 500, error: "Erro interno do servidor" };
    }
  }

  async existsById(id){
    try{
        if((id===null)||(id<=0)){
return {status:400, error: "O parâmetro id é inválido"};
        }

const vdata =await prisma.PlayerVariable.findUnique({where:{
    id:id
}});
if(vdata===null){
    return {status:404, error:"A variável especificada não existe"};
}

return {status:200, id:vdata.id, name:vdata.name}
    }catch(err){
        console.log("Erro ao recuperar uma variável:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}

async existsByName(name){
    try{
if((name===null)||(name==="")){
    return {status:400, error:"O parâmetro name é inválido"};
}

const vdata=await prisma.PlayerVariable.findFirst({where:{
    name:name.toLowerCase()
}});

if(vdata===null){
    return {status:404, error: "A variável com o nome especificado não existe"};
}

return {status:200, id:vdata.id, name:vdata.name};
    }catch(err){
        console.log("Erro ao recuperar um player:\n", err);
        return {status:500, error:"Erro interno do servidor"};
    }
}
}

export default PlayerVariableControllerWithParams;
