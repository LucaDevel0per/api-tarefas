import { Router, Request, Response } from 'express';
import TaskModel from '../models/Task';
import { error } from 'console';

const router = Router()

// route para criar uma nova tarefa
router.post('/tasks', async (req: Request, res: Response) => {
    try {
        const { title, description, } = req.body;

        const newTask = await TaskModel.create({
            title,
            description,
            completed: false, // padrão
        });

        res.status(201).json(newTask);
    } catch (err: any) {
        res.status(400). json({ error: err.message });
    }
});

export default router;