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

app.get("/orders/fetch", async (req, res) => {
  console.log('Request received for fetching):', req.query);
  try {
    const userId = req.query.userId;
    const response = await fetch(`http://order-service:3000/fetch?userId=${userId}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err:any) {
    console.error("Error forwarding fetch orders request:", err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.use("/add", async (req: Request, res: Response) => {
  try {
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        forwardedHeaders[key] = value; 
      } else if (Array.isArray(value)) {
        forwardedHeaders[key] = value.join(", "); 
      }
    }

    const response = await fetch("http://cart-service:3000/add", {
      method: "PUT",
      headers: forwardedHeaders, 
      body: JSON.stringify(req.body), 
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Error in /add route:", error.message);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.use("/remove", async (req: Request, res: Response) => {
 console.log('Request received for removing from cart:', req.body); 
  try {
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        forwardedHeaders[key] = value; 
      } else if (Array.isArray(value)) {
        forwardedHeaders[key] = value.join(", "); 
      }
    }

    const response = await fetch("http://cart-service:3000/remove", {
      method: "DELETE",
      headers: forwardedHeaders, 
      body: JSON.stringify(req.body), 
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Error in /add route:", error.message);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

app.use("/checkout", async (req, res) => {
  try {
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        forwardedHeaders[key] = value; 
      } else if (Array.isArray(value)) {
        forwardedHeaders[key] = value.join(", "); 
      }
    }

    const response = await fetch("http://order-service:3000/checkout", {
      method: "POST",
      headers: forwardedHeaders, 
      body: JSON.stringify(req.body), 
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err:any) {
    console.error("Checkout error:", err.message);
    res.status(500).json({ error: "Failed to process checkout" });
  }
});


app.use("/add", async (req: Request, res: Response) => {
  try {
    const forwardedHeaders: Record<string, string> = {};
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        forwardedHeaders[key] = value; 
      } else if (Array.isArray(value)) {
        forwardedHeaders[key] = value.join(", "); 
      }
    }

    const response = await fetch("http://cart-service:3000/add", {
      method: "PUT",
      headers: forwardedHeaders, 
      body: JSON.stringify(req.body), 
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error: any) {
    console.error("Error in /add route:", error.message);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});


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
