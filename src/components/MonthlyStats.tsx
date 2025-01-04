import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
import { BarChart, Calendar } from "lucide-react";

interface MonthlyStatsProps {
  tasks: Task[];
  currentDate: Date;
}

export function MonthlyStats({ tasks, currentDate }: MonthlyStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
  });

  const daysWithTasks = new Set(monthTasks.map(task => 
    new Date(task.date).getDate()
  )).size;

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <Card className="p-6 bg-secondary/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Días Activos</p>
            <h3 className="text-2xl font-bold text-foreground">{daysWithTasks}</h3>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-secondary/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <BarChart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Tareas</p>
            <h3 className="text-2xl font-bold text-foreground">{totalTasks}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-secondary/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${
            completionRate >= 70 
              ? 'bg-green-100 text-green-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            <div className="text-2xl font-bold">
              {completionRate}%
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Tasa de Completado</p>
            <p className="text-sm text-muted-foreground">
              {completedTasks} de {totalTasks} tareas
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}