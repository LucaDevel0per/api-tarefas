import { Router, Request, Response } from "express";
import TaskModel from "../models/Task";
// import { error } from 'console';

const router = Router();

// route para criar uma nova tarefa
router.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    const newTask = await TaskModel.create({
      title,
      description,
      completed: false, // padrão
    });

    res.status(201).json(newTask);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
    return;
  }
});

// route para buscar todas as tarefas
router.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find(); // busca todas as tarefas
    res.status(200).json(tasks);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
    return;
  }
});

// route para buscar tarefas pelo id
router.get("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id); //
    if (!task) {
      res.status(404).json({ message: "Tarefa não encontrada." });
      return;
    }

    res.status(200).json(task);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      res.status(400).json({ message: "Tarefa não encontrada." });
      return;
    }
    res.status(200).json(updatedTask);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(400).json({ message: "Tarefa não encontrada." });
      return;
    }
    res.status(200).json(deletedTask);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
