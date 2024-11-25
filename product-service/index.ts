import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/products', async (req, res) => {
	const products = await prisma.product.findMany();
	res.json(products);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Product service running on port ${PORT}`));
