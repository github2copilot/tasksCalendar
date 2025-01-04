import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
  onToggleTask: (taskId: string) => void;
}

export function TaskDialog({
  isOpen,
  onClose,
  date,
  tasks,
  onAddTask,
  onToggleTask,
}: TaskDialogProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddTask({
      title: newTaskTitle,
      description: newTaskDescription,
      date: date,
      completed: false,
    });

    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  const dayTasks = tasks.filter(
    (task) => format(new Date(task.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Tareas para el {format(date, "d 'de' MMMM 'de' yyyy", { locale: es })}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Nueva Tarea</Label>
              <Input
                id="title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Introduce el título de la tarea"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Introduce la descripción (opcional)"
              />
            </div>
            <Button type="submit">Añadir Tarea</Button>
          </form>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Tareas del Día</h4>
            {dayTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay tareas para este día</p>
            ) : (
              <div className="space-y-2">
                {dayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent"
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => onToggleTask(task.id)}
                    />
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}