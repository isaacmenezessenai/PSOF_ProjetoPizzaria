import { Router } from "express"; 
import prisma from "../prisma";

const router = Router();

// Buscar mesa pelo número
router.post("/find", async (req, res) => {
  const { number } = req.body;
  if (!number) {
    return res.status(400).json({ error: "Número da mesa não informado" });
  }
  try {
    const table = await prisma.table.findFirst({ where: { number: Number(number) } });
    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }
    return res.json(table);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar mesa" });
  }
});

// Validar mesa pelo id
router.get("/:id/validate", async (req, res) => {
  const { id } = req.params;

  try {
    const table = await prisma.table.findUnique({
      where: { id },
    });

    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }

    return res.json({
      id: table.id,
      number: table.number,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao validar mesa" });
  }
});

export default router;
