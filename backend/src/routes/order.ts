import { Router } from "express";
import prisma  from "../prisma";
import { CreateOrderController } from "../controllers/order/CreateOrderController";

const orderRoutes = Router();

const createOrderController = new CreateOrderController();

// Criar novo pedido
orderRoutes.post("/", (req, res) => createOrderController.handle(req, res));

orderRoutes.get("/:table_id", async (req, res) => {
  const { table_id } = req.params;

  try {
    const order = await prisma.order.findFirst({
      where: {
        table_id: table_id,
        status: false,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        table: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Nenhum pedido encontrado para esta mesa" });
    }

    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});



export { orderRoutes };
