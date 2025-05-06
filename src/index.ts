import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db";
import taskRoutes from './routes/tasks.routes';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', taskRoutes);

connectToDatabase(); // conexão com DB

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("API de Tarefas rodando!")
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})