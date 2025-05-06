import { Basic } from "@/components/ui/demo";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciador de Tarefas</h1>
      <div className="mb-4">
        <Basic />
      </div>
      <TaskList />
    </div>
  );
}
