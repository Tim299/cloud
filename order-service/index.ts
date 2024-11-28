import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.post("/checkout", async (req: any, res: any) => {
	const { userId } = req.body;
	console.log("Request received for checkout:", req.body);
  
	try {
	  const cartItems = await prisma.cart.findMany({
		where: { userId },
		include: { product: true },
	  });
  
	  if (!cartItems.length) {
		return res.status(400).json({ message: "Cart is empty" });
	  }
  
	  console.log("Cart items with product data:", cartItems);
  
	  const total = cartItems.reduce(
		(sum: number, item: any) => sum + item.product.price * item.quantity,
		0
	  );
  
	  const order = await prisma.order.create({
		data: {
		  userId,
		  total,
		  items: {
			create: cartItems.map((item: any) => ({
			  productId: item.productId,
			  quantity: item.quantity,
			  price: item.product.price, 
			})),
		  },
		},
	  });
  
	  await prisma.cart.deleteMany({
		where: { userId },
	  });
  
	  res.status(200).json({ message: "Checkout complete", order });
	} catch (err) {
	  console.error("Error during checkout:", err);
	  res.status(500).json({ error: "Failed to process checkout" });
	}
  });

  app.get("/fetch", async (req: Request, res: Response) => {
	const userId = Number(req.query.userId);
  
	try {
	  const orders = await prisma.order.findMany({
		where: { userId },
		include: { items: { include: { product: true } } },
	  });
  
	  res.status(200).json(orders);
	} catch (err) {
	  console.error("Error fetching orders:", err);
	  res.status(500).json({ error: "Failed to fetch orders" });
	}
  });
  
  app.listen(3000, () => {
	console.log("Server is running on port 3000");
  });
  