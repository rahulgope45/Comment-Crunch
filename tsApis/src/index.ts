import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express'
import {prisma}  from './lib/prisma.js'
import figlet from 'figlet';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import authRoutes from '../src/routes/user.route.js'

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser())

app.get('/',(req:Request,res:Response)=>{
     figlet("Comment Crunch", (err, data) => {
    if (err) {
      res.send("Error generating banner");
      return;
    }
    // Send colored ASCII art banner
    res.send(`<pre style="color: red;">${data}</pre>`);
  });
});


app.use('/api/auth',authRoutes)

app.listen(PORT,()=>{
    figlet("Comment Crunch",{ font: "Standard" }, (err, data) => {
    if (err) {
      console.log(chalk.red("Error generating banner"));
      return;
    }
    // Style ASCII art with chalk
    console.log(chalk.red.bold(data));
  });
    console.log(chalk.blue.bold(`Server is running at http://localhost:${PORT}`));

  
})

