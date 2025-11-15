import { Router } from "express";
import QRCode from "qrcode";
import prisma from "../prisma";

const router = Router();

router.get("/:tableId", async (req, res) => {
  const { tableId } = req.params;

  try {
    const table = await prisma.table.findUnique({
      where: { id: tableId },
    });

    if (!table) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }

    // payload do QR Code (simples: só id, ou mais info se quiser)
    const payload = JSON.stringify({ tableId: table.id });

    // gera QR code como base64
    const qrCodeDataURL = await QRCode.toDataURL(payload);

    return res.json({
      table: { id: table.id, number: table.number },
      qrCode: qrCodeDataURL,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao gerar QR Code" });
  }
});

export default router;
