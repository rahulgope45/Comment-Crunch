import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { prisma } from './lib/prisma.js';
import figlet from 'figlet';
import chalk from 'chalk';
const PORT = 3000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    figlet("Comment Crunch", (err, data) => {
        if (err) {
            res.send("Error generating banner");
            return;
        }
        // Send colored ASCII art banner
        res.send(`<pre style="color: red;">${data}</pre>`);
    });
});
app.listen(PORT, () => {
    figlet("Comment Crunch", { font: "Standard" }, (err, data) => {
        if (err) {
            console.log(chalk.red("Error generating banner"));
            return;
        }
        // Style ASCII art with chalk
        console.log(chalk.red.bold(data));
    });
    console.log(chalk.blue.bold(`Server is running at http://localhost:${PORT}`));
});
//# sourceMappingURL=index.js.map