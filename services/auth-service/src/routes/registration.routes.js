import path from 'path';
import { Router } from "express";


const __dirname = path.resolve();
const registrationRoutes = Router();

registrationRoutes.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../apps/auth-front/dist/index.html'));
});

export { registrationRoutes };
