'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { ToastSave } from "@/components/ui/toast-save";
import { Button as NeonButton } from "@/components/ui/neon-button";

interface BasicProps {
  onTaskAdded?: () => void;
}

function Basic({ onTaskAdded }: BasicProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toastState, setToastState] = useState<"initial" | "loading" | "success">("initial");
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setToastState("loading");
    try {
      await api.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      setToastState("success");
      setTimeout(() => setToastState("initial"), 2000);
      setTimeout(() => setOpen(false), 1200);
      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      setToastState("initial");
      console.error("Erro na requisição:", error);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setToastState("initial");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-center mb-8">
            <NeonButton>Adicionar Tarefa</NeonButton>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              New tasks are added to the default category.
            </DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={e => e.preventDefault()}>
            <div className="grid gap-2">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Enter task name here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter task description here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
          <ToastSave
            state={toastState}
            onSave={handleSave}
            onReset={handleReset}
            saveText="Add"
            resetText="Reset"
            initialText="Preencha os campos"
            loadingText="Adicionando..."
            successText="Tarefa adicionada!"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export { Basic };
