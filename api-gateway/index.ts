import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(express.json());

app.use(
  '/products',
  createProxyMiddleware({
    target: 'http://product-service:3000/', // Use Docker service name and internal port
    changeOrigin: true,
  })
);

// Proxy to Cart Service
app.use(
  '/cart',
  createProxyMiddleware({
    target: 'http://cart-service:3000', // Use Docker service name and internal port
    changeOrigin: true,
  })
);

// Proxy to Order Service
app.use(
  '/orders',
  createProxyMiddleware({
    target: 'http://order-service:3000', // Use Docker service name and internal port
    changeOrigin: true,
  })
);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
