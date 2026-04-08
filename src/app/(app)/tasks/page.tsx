import { tasks } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Task = {
  id: string;
  content: string;
  priority: 'High' | 'Medium' | 'Low';
};

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="mb-4 cursor-grab active:cursor-grabbing">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
            <p className="font-medium">{task.content}</p>
            <Badge
                variant="default"
                className={`border-none text-white ${priorityColors[task.priority]}`}
            >
                {task.priority}
            </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function KanbanColumn({ title, tasks }: { title: string; tasks: Task[] }) {
  return (
    <Card className="flex-1 bg-muted/40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b p-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Badge variant="secondary" className="text-base">{tasks.length}</Badge>
      </CardHeader>
      <CardContent className="p-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add task
        </Button>
      </CardContent>
    </Card>
  );
}

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-4">
       <div>
        <h1 className="font-headline text-3xl font-bold">Task & Project Tracker</h1>
        <p className="text-muted-foreground">
          Organize your work with a Kanban board.
        </p>
      </div>
      <div className="flex min-h-[calc(100vh-200px)] w-full flex-col gap-4 md:flex-row">
        <KanbanColumn title="To Do" tasks={tasks.todo} />
        <KanbanColumn title="In Progress" tasks={tasks.doing} />
        <KanbanColumn title="Done" tasks={tasks.done} />
      </div>
    </div>
  );
}
