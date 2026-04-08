import { notes } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Pin, Search } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Personal Note-Taking Hub</h1>
        <p className="text-muted-foreground">
          Capture ideas, lecture notes, and code snippets.
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search all notes..." className="pl-10" />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notes.sort((a,b) => Number(b.pinned) - Number(a.pinned)).map(note => (
          <Card key={note.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{note.title}</CardTitle>
                {note.pinned && <Pin className="h-5 w-5 text-primary" />}
              </div>
              <CardDescription>Last edited 2 hours ago</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3">
                This is a preview of the note content. Quick sort is a divide-and-conquer algorithm...
              </p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
