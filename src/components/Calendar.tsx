import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DAYS_ES, MONTHS_ES } from "@/lib/constants";
import { Task } from "@/types/task";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface CalendarProps {
  tasks: Task[];
  onSelectDate: (date: Date) => void;
}

export function Calendar({ tasks, onSelectDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const previousMonth = () => setCurrentDate(add(currentDate, { months: -1 }));
  const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));

  const getDayProgress = (date: Date) => {
    const dayTasks = tasks.filter((task) =>
      isEqual(new Date(task.date), date)
    );
    if (dayTasks.length === 0) return 0;
    const completed = dayTasks.filter((task) => task.completed).length;
    return Math.round((completed / dayTasks.length) * 100);
  };

  const getDayTaskCount = (date: Date) => {
    return tasks.filter((task) =>
      isEqual(new Date(task.date), date)
    ).length;
  };

  return (
    <div className="calendar-grid">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">
          {MONTHS_ES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={previousMonth}
            className="hover:bg-primary/10"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={nextMonth}
            className="hover:bg-primary/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {DAYS_ES.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {daysInMonth.map((date) => {
          const dayProgress = getDayProgress(date);
          const taskCount = getDayTaskCount(date);
          const isCurrentMonth = isSameMonth(date, currentDate);
          const today = isToday(date);
          
          return (
            <Button
              key={date.toISOString()}
              variant="ghost"
              className={`
                h-auto p-3 flex flex-col items-center justify-start rounded-lg
                transition-colors duration-200
                ${!isCurrentMonth 
                  ? "text-muted-foreground opacity-50" 
                  : today
                  ? "bg-primary/20 text-primary-foreground hover:bg-primary/30"
                  : "hover:bg-accent text-foreground"
                }
              `}
              onClick={() => onSelectDate(date)}
            >
              <span className="text-sm font-medium mb-1">
                {format(date, "d")}
              </span>
              {taskCount > 0 && (
                <div className="w-full space-y-1">
                  <Progress 
                    value={dayProgress} 
                    className="h-1.5 bg-secondary"
                    indicatorClassName="bg-primary"
                  />
                  <span className="text-xs text-muted-foreground">
                    {taskCount} tarea{taskCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}