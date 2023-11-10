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
      const { id } = req.body;

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

  async getVariable(req, res) {
    try {
      const { id } = req.params;

      const variable = await prisma.playerVariable.findUnique({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!variable) {
        return res.status(404).json({ message: "Variável não encontrada" });
      }

      return res.status(200).json({
        id: variable.id,
        name: variable.name,
        type: variable.type,
      });
    } catch (error) {
      console.error("Ocorreu um erro:", error);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

export default VariableController;
