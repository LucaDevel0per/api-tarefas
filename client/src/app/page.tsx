'use client';

import { useRef } from "react";
import { Basic } from "@/components/ui/demo";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  const taskListRef = useRef<any>(null);

  const handleTaskAdded = () => {
    if (taskListRef.current) {
      taskListRef.current.fetchTasks();
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8 text-center">Gerenciador de Tarefas</h1>
      <Basic onTaskAdded={handleTaskAdded} />
      <TaskList ref={taskListRef} />
    </div>
  );
}
