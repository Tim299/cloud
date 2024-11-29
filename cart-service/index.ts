import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());


app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
	console.log('Headers:', req.headers);
	console.log('Body:', req.body);
	next();
  });


app.put('/add', async (req: any, res: any) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    console.error('Error: Missing userId or productId');
    return res.status(400).json({ error: 'userId and productId are required' });
  }
  try {
    const existingCartItem = await prisma.cart.findFirst({
      where: { userId, productId },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + 1 },
      });
      console.log('Updated cart item:', updatedCartItem);
      return res.json(updatedCartItem);
    } else {
      const newCartItem = await prisma.cart.create({
        data: { userId, productId, quantity: 1 },
      });
      console.log('Created new cart item:', newCartItem);
      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error('Error while adding to cart:', error);
    return res.status(500).json({ error: 'An error occurred while adding to the cart' });
  }
});

app.get('/fetch', async (req: any, res: any) => {
  const { userId } = req.query;

  if (!userId) {
    console.error('Error: Missing userId');
    return res.status(400).json({ error: 'userId is required' });
  }
  try {
    const cartItems = await prisma.cart.findMany({
      where: { userId: Number(userId) },
    });
    console.log('Fetched cart items:', cartItems);
    return res.json(cartItems);
  } catch (error) {
    console.error('Error while fetching cart:', error);
    return res.status(500).json({ error: 'An error occurred while fetching the cart' });
  }
});


  app.delete('/remove', async (req: any, res: any) => {
	const { userId, productId } = req.body;
  
	if (!userId || !productId) {
	  return res.status(400).json({ error: 'userId and productId are required' });
	}
  
	try {
	  const existingCartItem = await prisma.cart.findFirst({
		where: { userId, productId },
	  });
  
	  if (!existingCartItem) {
		return res.status(404).json({ error: 'Item not found in the cart' });
	  }
  
	  if (existingCartItem.quantity > 1) {
		const updatedCartItem = await prisma.cart.update({
		  where: { id: existingCartItem.id },
		  data: { quantity: existingCartItem.quantity - 1 },
		});
		return res.json(updatedCartItem);
	  } else {
		await prisma.cart.delete({
		  where: { id: existingCartItem.id },
		});
		return res.status(200).json({ message: 'Item removed from the cart' });
	  }
	} catch (error) {
	  console.error('Error removing item from cart:', error);
	  res.status(500).json({ error: 'An error occurred while removing the item' });
	}
  });
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
