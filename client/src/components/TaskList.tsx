'use client';

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import api from '../lib/api';
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export const TaskList = forwardRef(function TaskList(props: { onTaskAdded?: () => void }, ref) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editOpen, setEditOpen] = useState(false);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            setLoading(false);
        } catch (err) {
            setError('Erro ao carregar tarefas');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchTasks
    }));

    const handleDelete = async (id: string) => {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
        setDeletingId(null);
    };

    const handleToggleComplete = async (task: Task) => {
        const updated = { ...task, completed: !task.completed };
        await api.patch(`/tasks/${task._id}`, { completed: updated.completed });
        setTasks(tasks.map(t => t._id === task._id ? updated : t));
    };

    const openEditDialog = (task: Task) => {
        setEditTask(task);
        setEditTitle(task.title);
        setEditDescription(task.description);
        setEditOpen(true);
    };

    const handleEditSave = async () => {
        if (!editTask) return;
        await api.patch(`/tasks/${editTask._id}`, {
            title: editTitle,
            description: editDescription,
        });
        setTasks(tasks.map(t => t._id === editTask._id ? { ...t, title: editTitle, description: editDescription } : t));
        setEditOpen(false);
        setEditTask(null);
    };

    // Separar tarefas pendentes e feitas
    const pendingTasks = tasks.filter(task => !task.completed);
    const doneTasks = tasks.filter(task => task.completed);

    if (loading) return <div className="text-center mt-8">Carregando...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="flex justify-center mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
                {/* Pendentes */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-orange-400"></span>
                        Pendentes
                    </h2>
                    <div className="space-y-4">
                        {pendingTasks.length === 0 && <div className="text-gray-400">Nenhuma tarefa pendente.</div>}
                        {pendingTasks.map(task => (
                            <div key={task._id} className="bg-white rounded-lg shadow p-4 flex items-start justify-between gap-4">
                                <div className="flex gap-3 items-start">
                                    <Button size="icon" variant="ghost" title="Finalizar" onClick={() => handleToggleComplete(task)}>
                                        <Circle className="w-5 h-5 text-orange-400" />
                                    </Button>
                                    <div>
                                        <div className="font-semibold text-lg">{task.title}</div>
                                        <div className="text-gray-500 mt-1">{task.description}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[48px]">
                                    <Button size="icon" variant="ghost" title="Editar" onClick={() => openEditDialog(task)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="destructive" title="Deletar">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Deletar tarefa?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tem certeza que deseja deletar esta tarefa? Essa ação não pode ser desfeita.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(task._id)}>
                                            Deletar
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Feitas */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                        Feitas
                    </h2>
                    <div className="space-y-4">
                        {doneTasks.length === 0 && <div className="text-gray-400">Nenhuma tarefa concluída.</div>}
                        {doneTasks.map(task => (
                            <div key={task._id} className="bg-white rounded-lg shadow p-4 flex items-start justify-between gap-4 opacity-70">
                                <div className="flex gap-3 items-start">
                                    <Button size="icon" variant="ghost" title="Desfazer" onClick={() => handleToggleComplete(task)}>
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </Button>
                                    <div>
                                        <div className="font-semibold text-lg line-through">{task.title}</div>
                                        <div className="text-gray-500 mt-1">{task.description}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 min-w-[48px]">
                                    <Button size="icon" variant="ghost" title="Editar" onClick={() => openEditDialog(task)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button size="icon" variant="destructive" title="Deletar">
                                          <Trash2 className="w-4 h-4" />
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Deletar tarefa?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Tem certeza que deseja deletar esta tarefa? Essa ação não pode ser desfeita.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                          <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(task._id)}>
                                            Deletar
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Dialog de edição */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Tarefa</DialogTitle>
                  <DialogDescription>Altere o título e a descrição da tarefa.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={e => e.preventDefault()}>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-title">Título</Label>
                    <Input
                      id="edit-title"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description">Descrição</Label>
                    <Input
                      id="edit-description"
                      value={editDescription}
                      onChange={e => setEditDescription(e.target.value)}
                    />
                  </div>
                </form>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </DialogClose>
                  <Button onClick={handleEditSave} variant="default">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
    );
}); 