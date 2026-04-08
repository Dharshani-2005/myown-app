import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';

const mockOutput = {
  atsMatchScore: 78,
  missingSkills: ["Kubernetes", "Google Cloud Platform (GCP)", "Terraform"],
  improvementSuggestions: [
    "Add a 'Projects' section to showcase hands-on experience.",
    "Quantify achievements in your experience section, e.g., 'Improved API response time by 30%'.",
    "Incorporate keywords from the job description like 'CI/CD pipelines' and 'microservices architecture'."
  ],
  tailoredResumeSummary: "A highly motivated final-year Computer Science student with a strong foundation in backend development using Python and Node.js. Experienced in building and deploying RESTful APIs with Docker and AWS. Eager to apply skills in a challenging Software Engineer role to contribute to building scalable microservices architectures."
};

export default function CareerAiPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">AI Resume & Career Optimization</h1>
        <p className="text-muted-foreground">
          Optimize your resume for any job description and get AI-driven career insights.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Resume</CardTitle>
              <CardDescription>Paste the full text of your resume here.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Paste your resume content..." className="min-h-80 font-code text-sm" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the job description you are applying for.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Paste job description content..." className="min-h-80 text-sm" />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
            <Button className="w-full">Optimize My Application</Button>
            
            <Card>
                <CardHeader>
                    <CardTitle>Optimization Results</CardTitle>
                    <CardDescription>Here is the AI analysis of your resume against the job description.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">ATS Match Score</h3>
                            <span className="font-bold text-lg text-primary">{mockOutput.atsMatchScore}%</span>
                        </div>
                        <Progress value={mockOutput.atsMatchScore} />
                    </div>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 p-4">
                           <AlertTriangle className="h-5 w-5 text-destructive" />
                           <h3 className="font-semibold">Missing Skills</h3>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                           <div className="flex flex-wrap gap-2">
                            {mockOutput.missingSkills.map(skill => (
                                <Badge key={skill} variant="destructive">{skill}</Badge>
                            ))}
                           </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2 p-4">
                           <Lightbulb className="h-5 w-5 text-yellow-500" />
                           <h3 className="font-semibold">Improvement Suggestions</h3>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                           <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                            {mockOutput.improvementSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                           </ul>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader className="flex flex-row items-center gap-2 p-4">
                           <CheckCircle className="h-5 w-5 text-green-500" />
                           <h3 className="font-semibold">Tailored Resume Summary</h3>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                           <p className="text-sm text-muted-foreground italic border-l-4 pl-4">
                            {mockOutput.tailoredResumeSummary}
                           </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
