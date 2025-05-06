'use client';

import { useEffect, useState } from 'react';
import api from '../lib/api';

interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
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

        fetchTasks();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            {tasks.map((task) => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.completed ? 'Concluída' : 'Pendente'}</p>
                </div>
            ))}
        </div>
    );
} 