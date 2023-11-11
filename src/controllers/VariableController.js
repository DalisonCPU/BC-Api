import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class VariableController {
  async createVariable(req, res) {
    try {
      const { name, type } = req.body;

      const newVariable = await prisma.playerVariable.create({
        data: {
          name,
          type,
        },
      });

      return res.status(200).json({
        id: newVariable.id,
        name: newVariable.name,
        type: newVariable.type,
      });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async updateVariable(req, res) {
    try {
      const { id, name, type } = req.body;

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
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async deleteVariable(req, res) {
    try {
      const id = parseInt(req.params.id)

      await prisma.playerVariable.delete({
        where: {
          id,
        },
      });

      return res.status(200).send(); // Resposta sem conteúdo para indicar sucesso na exclusão
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }

  async getListVariables(req, res) {
    try {
      let listIds = req.params.listIds

      if (!listIds) {
        return res.status(400).json({ message: "IDs não informados" });
      }

      listIds = listIds.split(",").map(id => parseInt(id, 10))

      const variable = await prisma.playerVariable.findMany({
        where: {
          id: {
            in: listIds
          }
        },
      });

      if (!variable) {
        return res.status(404).json({ message: "Variável não encontrada" });
      }

      return res.status(200).json(variable.map(v => ({
        id: v.id,
        name: v.name,
        type: v.type,
      })))
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default VariableController;
