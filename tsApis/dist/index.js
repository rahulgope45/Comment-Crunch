import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { prisma } from './lib/prisma.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello world");
});
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
//# sourceMappingURL=index.js.map