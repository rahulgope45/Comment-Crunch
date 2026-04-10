import express, { type Request, type Response } from 'express'

const PORT = 3000;
const app = express();
app.use(express.json());

app.get('/',(req:Request,res:Response)=>{
    res.send("Hello world")
});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

