import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clapperboard, PencilRuler, Layers } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const mockOutput = {
  summary: "This document provides a comprehensive overview of virtual memory in operating systems, covering concepts like paging, page tables, and demand paging. It explains how virtual memory allows a process to use more memory than is physically available by swapping pages between RAM and disk.",
  videoScript: `
    Scene 1:
    Narrator: What if I told you your computer can run programs bigger than its actual memory?
    [Visual: A small RAM chip with a huge program icon floating above it.]

    Scene 2:
    Narrator: This magic is called Virtual Memory. It's a clever trick where the OS uses your hard disk as an extension of RAM.
    [Visual: An animation showing data moving from a hard disk to a RAM chip.]
  `,
  visualSceneDescriptions: [
    "A student looking puzzled at a computer screen showing an 'out of memory' error.",
    "An animated diagram showing a large virtual address space mapping to a smaller physical RAM.",
    "Close-up on a page table, with entries being looked up.",
    "An animation of a 'page fault' with a red alert icon, followed by a page being loaded from disk."
  ],
  mockTest: [
    {
      question: "What is the primary purpose of virtual memory?",
      options: [
        "To make the computer faster",
        "To allow a process to use more memory than is physically available",
        "To store files permanently",
        "To manage CPU scheduling"
      ],
      correctAnswer: "To allow a process to use more memory than is physically available"
    },
    {
      question: "A 'page fault' occurs when:",
      options: [
        "A page is corrupted in memory",
        "A requested page is not in physical memory",
        "The CPU requests an invalid address",
        "There is no space left on the disk"
      ],
      correctAnswer: "A requested page is not in physical memory"
    }
  ],
  flashcards: [
    {
      front: "Paging",
      back: "A memory management scheme that eliminates the need for contiguous allocation of physical memory."
    },
    {
      front: "Page Table",
      back: "A data structure used by the virtual memory system to store the mapping between virtual addresses and physical addresses."
    }
  ]
};

export default function StudyAiPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-headline text-3xl font-bold">AI Study Tool Generator</h1>
          <p className="text-muted-foreground">
            Paste your notes or a LaTeX formula to generate study materials instantly.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Input Material</CardTitle>
            <CardDescription>
              Provide your study notes, a complex topic, or a LaTeX formula.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea
              placeholder="e.g., 'Explain the concept of virtual memory in operating systems...' or 'e^{i\pi} + 1 = 0'"
              className="min-h-64"
            />
            <Button className="w-full">Generate Study Tools</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>
            Your AI-powered study aids are ready.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="summary"><FileText className="h-4 w-4 mr-1"/>Summary</TabsTrigger>
              <TabsTrigger value="video"><Clapperboard className="h-4 w-4 mr-1"/>Video Script</TabsTrigger>
              <TabsTrigger value="test"><PencilRuler className="h-4 w-4 mr-1"/>Mock Test</TabsTrigger>
              <TabsTrigger value="flashcards"><Layers className="h-4 w-4 mr-1"/>Flashcards</TabsTrigger>
            </TabsList>
            <div className="mt-4 min-h-96 rounded-md border p-4">
              <TabsContent value="summary">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground">{mockOutput.summary}</p>
              </TabsContent>
              <TabsContent value="video">
                <h3 className="font-semibold mb-2">Video Script & Scenes</h3>
                <pre className="text-sm bg-muted p-2 rounded-md whitespace-pre-wrap font-code">{mockOutput.videoScript}</pre>
                 <h4 className="font-semibold mt-4 mb-2">Visual Scene Ideas</h4>
                 <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {mockOutput.visualSceneDescriptions.map((desc, i) => <li key={i}>{desc}</li>)}
                 </ul>
              </TabsContent>
              <TabsContent value="test">
                <h3 className="font-semibold mb-4">Mock Test</h3>
                <div className="space-y-6">
                  {mockOutput.mockTest.map((q, i) => (
                    <div key={i}>
                      <p className="font-medium mb-2">{i+1}. {q.question}</p>
                      <RadioGroup>
                        {q.options.map((opt, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <RadioGroupItem value={opt} id={`q${i}-opt${j}`} />
                            <Label htmlFor={`q${i}-opt${j}`}>{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <p className="text-sm text-primary mt-2">Correct Answer: {q.correctAnswer}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="flashcards">
                <h3 className="font-semibold mb-4">Flashcards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockOutput.flashcards.map((card, i) => (
                     <div key={i} className="group [perspective:1000px]">
                        <div className="relative h-32 w-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card border p-4 [backface-visibility:hidden]">
                            <p className="text-center font-semibold">{card.front}</p>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary text-primary-foreground p-4 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                             <p className="text-center text-sm">{card.back}</p>
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
