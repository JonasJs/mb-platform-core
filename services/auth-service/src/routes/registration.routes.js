import path from 'path';
import express, { Router } from "express";

const registrationRoutes = Router();

const __dirname = path.resolve();
const authFrontDist = path.resolve(__dirname, '../../apps/auth-front/dist');

const isProd = process.env.NODE_ENV === 'production';

if(isProd) {
  registrationRoutes.use(express.static(authFrontDist));
  registrationRoutes.get('/', (_req, res) => {
    res.sendFile(path.join(authFrontDist, 'index.html'));
  });
}

export { registrationRoutes };
