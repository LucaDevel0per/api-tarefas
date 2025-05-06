import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/db";
import taskRoutes from './routes/tasks.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

connectToDatabase(); // conexão com DB

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("API de Tarefas rodando!")
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})