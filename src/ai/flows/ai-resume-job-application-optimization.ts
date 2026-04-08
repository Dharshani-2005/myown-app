'use server';
/**
 * @fileOverview A Genkit flow for optimizing a student's resume for specific job applications.
 *
 * - aiResumeJobApplicationOptimization - A function that optimizes a resume for a given job description.
 * - AIResumeJobApplicationOptimizationInput - The input type for the aiResumeJobApplicationOptimization function.
 * - AIResumeJobApplicationOptimizationOutput - The return type for the aiResumeJobApplicationOptimization function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the resume optimization flow
const AIResumeJobApplicationOptimizationInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the student\'s resume.'),
  jobDescription: z.string().describe('The full text content of the job posting description.'),
});
export type AIResumeJobApplicationOptimizationInput = z.infer<typeof AIResumeJobApplicationOptimizationInputSchema>;

// Define the output schema for the resume optimization flow
const AIResumeJobApplicationOptimizationOutputSchema = z.object({
  atsMatchScore: z.number().describe('A score (0-00) indicating how well the resume matches the job description for ATS.'),
  missingSkills: z.array(z.string()).describe('Skills from the job description that are either absent from the resume or not sufficiently highlighted.'),
  improvementSuggestions: z.array(z.string()).describe('Actionable advice on how the resume can be modified to better align with the job description and improve its ATS score.'),
  tailoredResumeSummary: z.string().describe('A summary or section of the resume re-written/highlighted to specifically target this job.'),
});
export type AIResumeJobApplicationOptimizationOutput = z.infer<typeof AIResumeJobApplicationOptimizationOutputSchema>;

// Define the prompt for the resume optimization AI
const resumeOptimizationPrompt = ai.definePrompt({
  name: 'resumeOptimizationPrompt',
  input: {schema: AIResumeJobApplicationOptimizationInputSchema},
  output: {schema: AIResumeJobApplicationOptimizationOutputSchema},
  prompt: `You are an expert career coach and an Applicant Tracking System (ATS) specialist. Your task is to analyze a given resume against a specific job description, simulate an ATS scan, identify skill gaps, and provide actionable improvement suggestions.

Based on the provided resume and job description, perform the following analysis and provide the output in JSON format:

1.  **ATS Match Score:** Evaluate the resume's compatibility with the job description for an Applicant Tracking System. Provide a score from 0 to 100, where 100 is a perfect match.
2.  **Missing Skills:** Identify key skills mentioned in the job description that are either absent from the resume or not sufficiently highlighted.
3.  **Improvement Suggestions:** Offer specific, actionable advice on how the resume can be modified to better align with the job description and improve its ATS score. Focus on keyword optimization, content structuring, and emphasis on relevant experiences.
4.  **Tailored Resume Summary/Section:** Provide a re-written or highlighted summary section of the resume that directly addresses the key requirements and keywords from the job description. This could be a new "Summary" or "Objective" section, or a re-framing of an "Experience" section.

---
**Resume:**
{{{resumeText}}}

---
**Job Description:**
{{{jobDescription}}}
`,
});

// Define the Genkit flow for resume optimization
const aiResumeJobApplicationOptimizationFlow = ai.defineFlow(
  {
    name: 'aiResumeJobApplicationOptimizationFlow',
    inputSchema: AIResumeJobApplicationOptimizationInputSchema,
    outputSchema: AIResumeJobApplicationOptimizationOutputSchema,
  },
  async (input) => {
    const {output} = await resumeOptimizationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate resume optimization output.');
    }
    return output;
  }
);

// Export the wrapper function that calls the flow
export async function aiResumeJobApplicationOptimization(
  input: AIResumeJobApplicationOptimizationInput
): Promise<AIResumeJobApplicationOptimizationOutput> {
  return aiResumeJobApplicationOptimizationFlow(input);
}
