import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { user, timetable, deadlines, communityUpdates } from '@/lib/data';
import { Bell, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Welcome back, {user.name.split(' ')[0]}!</CardTitle>
            <CardDescription>Here&apos;s a look at your week.</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-2">
              <CardTitle>Weekly Timetable</CardTitle>
              <CardDescription>
                Your lectures and labs for the upcoming week.
              </CardDescription>
            </div>
             <Clock className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetable.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.day}</TableCell>
                    <TableCell>{item.time}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${item.color} text-black`}>{item.subject}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Assignments and exams you need to prepare for.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {deadlines.map((deadline) => (
                <div key={deadline.id} className="grid gap-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{deadline.title}</p>
                    <p className="text-sm text-muted-foreground">{deadline.dueDate}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{deadline.subject}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Community Feed</CardTitle>
            <CardDescription>Latest updates from your peers and groups.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {communityUpdates.map((update) => (
                 <div key={update.id} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {update.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {update.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
