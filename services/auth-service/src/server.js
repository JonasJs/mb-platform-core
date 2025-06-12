import express from 'express';
import { router } from "./routes/index.js";
import path from 'path';

const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, '../../apps/auth-front/dist')));

// Routes
app.use(router);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../apps/auth-front/dist/index.html'));
// });

app.listen(PORT, () => console.log(`🚀 Auth Service running on port ${PORT}`));
