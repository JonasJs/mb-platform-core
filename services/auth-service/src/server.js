import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { router } from "./routes/index.js";

const PORT = process.env.PORT || 3001;

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!isProd) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
      filter: (req) => req.method === 'GET'
    })
  );
}

app.use(router);

app.listen(PORT, () => {
  console.log('\x1b[32m%s\x1b[0m', `🚀 Auth Service running on port ${PORT}`);
  console.log('\x1b[36m%s\x1b[0m', `➜ Local:   http://localhost:${PORT}/`);
});
