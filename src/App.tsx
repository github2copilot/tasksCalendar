import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { MonthlyStats } from "./components/MonthlyStats";
import { TaskDialog } from "./components/TaskDialog";
import { Task } from "./types/task";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddTask = (newTask: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...newTask, id: uuidv4() }]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-accent/20 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Agenda de Tareas
        </h1>
        
        <MonthlyStats tasks={tasks} currentDate={new Date()} />
        
        <Calendar
          tasks={tasks}
          onSelectDate={(date) => setSelectedDate(date)}
        />

        <TaskDialog
          isOpen={selectedDate !== null}
          onClose={() => setSelectedDate(null)}
          date={selectedDate ?? new Date()}
          tasks={tasks}
          onAddTask={handleAddTask}
          onToggleTask={handleToggleTask}
        />
      </div>
    </div>
  );
}

export default App;