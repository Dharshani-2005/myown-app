import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Code, BrainCircuit, Link as LinkIcon, Star } from "lucide-react";
import { placementPrep } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

function InterviewChat() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mock Interview Session</CardTitle>
        <CardDescription>The AI will ask you questions based on your selections.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[600px]">
        <div className="flex-1 space-y-6 overflow-y-auto p-4 rounded-md border">
          {/* AI Question */}
          <div className="flex items-start gap-3">
            <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>
            <div className="flex-1 rounded-lg bg-muted p-3">
              <p className="font-semibold text-sm">AI Coach</p>
              <p className="text-sm">
                Alright, let&apos;s begin. Since you&apos;re interviewing for a Software Engineer role at Google, can you explain the difference between a process and a thread?
              </p>
            </div>
          </div>
          {/* User Response */}
          <div className="flex items-start gap-3 flex-row-reverse">
            <AvatarIcon><User className="h-5 w-5"/></AvatarIcon>
            <div className="flex-1 rounded-lg bg-primary/10 p-3">
              <p className="font-semibold text-sm text-right">You</p>
              <p className="text-sm">
                A process is an instance of a program in execution, with its own memory space. A thread is the smallest unit of execution within a process, and threads within the same process share the same memory space.
              </p>
            </div>
          </div>
           {/* AI Feedback */}
           <div className="flex items-start gap-3">
            <AvatarIcon><Bot className="h-5 w-5"/></AvatarIcon>
            <div className="flex-1 rounded-lg bg-muted p-3">
              <p className="font-semibold text-sm">AI Coach - Feedback</p>
              <p className="text-sm">
                That&apos;s a solid, concise answer. Good job. You clearly defined both and highlighted the key difference in memory space.
              </p>
              <p className="font-semibold text-sm mt-3">Next Question:</p>
              <p className="text-sm">
                Could you now write a simple Java code snippet to demonstrate creating and starting a new thread?
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Textarea placeholder="Type your answer or code here..." className="flex-1" rows={1}/>
          <Button size="icon"><Send className="h-4 w-4"/></Button>
        </div>
      </CardContent>
    </Card>
  )
}

const AvatarIcon = ({children}: {children: React.ReactNode}) => (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground shrink-0">
        {children}
    </div>
)

function PrepQuestion({ question, company, bruteForce, better, optimal, practiceLink, concept }: any) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{question}</CardTitle>
                    <Badge variant="outline">{company}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Solution Approaches</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                           <p><strong className="text-destructive">Brute Force:</strong> {bruteForce}</p>
                           <p><strong className="text-yellow-600">Better:</strong> {better}</p>
                           <p><strong className="text-green-600">Optimal:</strong> {optimal}</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Concepts & Practice</AccordionTrigger>
                        <AccordionContent className="space-y-2">
                           <div className="flex items-center gap-2">
                                <BrainCircuit className="h-4 w-4 text-muted-foreground"/>
                                <strong>Concepts:</strong> <span className="text-sm text-muted-foreground">{concept}</span>
                           </div>
                           <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-muted-foreground"/>
                                <strong>Practice:</strong> 
                                <Button variant="link" asChild className="p-0 h-auto">
                                    <Link href={practiceLink} target="_blank">LeetCode Link</Link>
                                </Button>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}

function NonTechQuestion({ question, company, trick }: any) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{question}</CardTitle>
                    <Badge variant="outline">{company}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex items-start gap-3">
                <Star className="h-5 w-5 text-yellow-500 mt-1"/>
                <div>
                    <h4 className="font-semibold">Trick to answer:</h4>
                    <p className="text-sm text-muted-foreground">{trick}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default function InterviewAiPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Advanced Placement & Interview AI Coach</h1>
        <p className="text-muted-foreground">
          Practice mock interviews and study key placement questions.
        </p>
      </div>

      <Tabs defaultValue="coach" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="coach">AI Mock Interview</TabsTrigger>
          <TabsTrigger value="prep">Placement Prep Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="coach" className="mt-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Setup</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <label>Job Role</label>
                    <Input placeholder="e.g., Software Engineer" defaultValue="Software Engineer"/>
                  </div>
                  <div className="grid gap-2">
                    <label>Company</label>
                    <Input placeholder="e.g., Google" defaultValue="Google"/>
                  </div>
                  <div className="grid gap-2">
                    <label>Interview Type</label>
                    <Select defaultValue="technical">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="behavioral">Behavioral</SelectItem>
                        <SelectItem value="hr">HR Round</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Start Interview</Button>
                </CardContent>
              </Card>
            </div>
            <div className="md:col-span-2">
                <InterviewChat />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="prep" className="mt-6">
            <Tabs defaultValue="technical" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="technical">Technical Round</TabsTrigger>
                    <TabsTrigger value="non-technical">Non-Technical / HR</TabsTrigger>
                    <TabsTrigger value="mcq">MCQ Challenge</TabsTrigger>
                </TabsList>
                <TabsContent value="technical" className="mt-4">
                    {placementPrep["Technical Round"].map((q, i) => <PrepQuestion key={i} {...q} />)}
                </TabsContent>
                <TabsContent value="non-technical" className="mt-4">
                    {placementPrep["Non-Technical / HR"].map((q, i) => <NonTechQuestion key={i} {...q} />)}
                </TabsContent>
                <TabsContent value="mcq" className="mt-4">
                    <Card>
                        <CardHeader><CardTitle>MCQ Challenge</CardTitle></CardHeader>
                        <CardContent>
                            {placementPrep["MCQ Challenge"].map((q, i) => (
                                <div key={i} className="mb-4 p-4 border rounded-lg">
                                    <p className="font-medium">{i+1}. {q.question}</p>
                                    <div className="text-sm text-muted-foreground mt-2 grid grid-cols-2 gap-2">
                                        {q.options.map(opt => <span key={opt}>{opt}</span>)}
                                    </div>
                                    <p className="text-sm text-primary mt-2 font-bold">Correct: {q.answer}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
