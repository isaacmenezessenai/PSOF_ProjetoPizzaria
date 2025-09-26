import { Router } from "express";
import prisma from "../prisma";

const router = Router();

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
