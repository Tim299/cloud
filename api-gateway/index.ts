import cors from 'cors';
import express, { Request, Response, NextFunction } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";

const app = express();
app.use(express.json());

app.use(cors());


app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});


app.use(
  '/cart/fetch',
  createProxyMiddleware({
    target: 'http://cart-service:3000/fetch',
    changeOrigin: true,
  })
);

app.use("/add", async (req: Request, res: Response) => {
  try {
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        forwardedHeaders[key] = value; // Add single-value headers
      } else if (Array.isArray(value)) {
        forwardedHeaders[key] = value.join(", "); // Join array values into a string
      }
    }

    const response = await fetch("http://cart-service:3000/add", {
      method: "PUT",
      headers: forwardedHeaders, // Use the converted headers
      body: JSON.stringify(req.body), // Forward the incoming body
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Error in /add route:", error.message);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});


app.use(
  '/cart',
  createProxyMiddleware({
    target: 'http://cart-service:3000/add',
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        const originalUrl = (req as express.Request).originalUrl;
        console.log(`[Proxy] Forwarding to Product Service: ${originalUrl}`);
      },
    },
  })
);

app.use(
  '/products',
  createProxyMiddleware({
    target: 'http://product-service:3000/',
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        const originalUrl = (req as express.Request).originalUrl;
        console.log(`[Proxy] Forwarding to Product Service: ${originalUrl}`);
      },
    },
  })
);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
