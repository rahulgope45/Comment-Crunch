import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { prisma, testDatabaseConnection } from './lib/prisma.js';
import figlet from 'figlet';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/user.route.js';
import { testYoutubeConnection } from './lib/youtube.js';
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    figlet("Comment Crunch", (err, data) => {
        if (err) {
            res.send("Error generating banner");
            return;
        }
        // colored ASCII art banner
        res.send(`<pre style="color: red;">${data}</pre>`);
    });
});
//Routes connection
app.use('/api/auth', authRoutes);
const startServer = async () => {
    console.log("Checking all the apis connection");
    //Conection test for Youtube Api
    const isYoutubeConnectionOk = await testYoutubeConnection();
    if (!isYoutubeConnectionOk) {
        console.log("YouTube Connection Failed");
    }
    //Conection test for Database Api
    const isDatabaseConnectionOk = await testDatabaseConnection();
    if (!isDatabaseConnectionOk) {
        console.log("Database Connection failed");
    }
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
};
startServer();
//# sourceMappingURL=index.js.map