'use server';
/**
 * @fileOverview An AI coach for mock interviews, providing tailored questions and feedback.
 *
 * - aiMockInterviewCoaching - A function that handles the mock interview process.
 * - AIMockInterviewCoachingInput - The input type for the aiMockInterviewCoaching function.
 * - AIMockInterviewCoachingOutput - The return type for the aiMockInterviewCoaching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIMockInterviewCoachingInputSchema = z.object({
  role: z.string().describe('The job role the student is interviewing for (e.g., "Software Development Engineer", "Data Scientist").'),
  company: z.string().describe('The target company for the interview (e.g., "Google", "Amazon", "TCS").'),
  interviewType: z.enum(['technical', 'hr', 'behavioral']).describe('The type of interview (technical, hr, or behavioral).'),
  currentQuestion: z.string().optional().describe('The question previously asked by the AI coach. Required for subsequent turns.'),
  userResponse: z.string().optional().describe('The candidate\u0027s textual response to the current question. Provide this if userCode is not applicable.'),
  userCode: z.string().optional().describe('The candidate\u0027s code snippet response for technical questions. Provide this for coding questions.'),
  isInitialCall: z.boolean().default(false).describe('Set to true for the very first call to start the interview.'),
});
export type AIMockInterviewCoachingInput = z.infer<typeof AIMockInterviewCoachingInputSchema>;

const AIMockInterviewCoachingOutputSchema = z.object({
  question: z.string().describe('The next question from the AI coach.'),
  feedback: z.string().optional().describe('Constructive feedback on the candidate\u0027s previous response. Provided after the first question.'),
  suggestions: z.string().optional().describe('Specific suggestions for improvement based on the response. Provided after the first question.'),
  isComplete: z.boolean().default(false).describe('Indicates if the current mock interview round is considered complete.'),
  difficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty level of the generated question.'),
});
export type AIMockInterviewCoachingOutput = z.infer<typeof AIMockInterviewCoachingOutputSchema>;

export async function aiMockInterviewCoaching(input: AIMockInterviewCoachingInput): Promise<AIMockInterviewCoachingOutput> {
  return aiMockInterviewCoachingFlow(input);
}

const aiMockInterviewCoachingPrompt = ai.definePrompt({
  name: 'aiMockInterviewCoachingPrompt',
  input: { schema: AIMockInterviewCoachingInputSchema },
  output: { schema: AIMockInterviewCoachingOutputSchema },
  prompt: `You are an AI Interview Coach for engineering students preparing for placements. Your goal is to conduct a mock interview that is tailored to a specific role and company, provide constructive feedback, and ask the next question.

## Interview Details:
-   **Role:** {{{role}}}
-   **Company:** {{{company}}}
-   **Interview Type:** {{{interviewType}}}

{{#if isInitialCall}}
You will start the interview by asking the first question relevant to the specified role, company, and interview type.
Do not provide any feedback or suggestions yet. Just ask the question.
Ensure the question is typical for a {{{interviewType}}} interview at {{{company}}} for a {{{role}}} position.
The question should have a 'medium' difficulty.
{{else}}
## Previous Interaction:
-   **Question Asked:** "{{{currentQuestion}}}"
-   **Candidate's Response:**
    {{#if userResponse}}
    "{{{userResponse}}}"
    {{/if}}
    {{#if userCode}}
    \`\`\`
    {{{userCode}}}
    \`\`\`
    {{/if}}

Based on the candidate's response to the previous question:
1.  Provide concise, constructive feedback on their answer. Highlight strengths and areas for improvement.
2.  If the interviewType is 'technical' and userCode is provided, evaluate the code for correctness, efficiency, and clarity. Provide specific suggestions for improvement. If the code is incorrect or inefficient, explain why and suggest improvements.
3.  Ask the next question. This question should either be a follow-up to the previous topic if the candidate struggled or a new question to cover other areas.
4.  Vary the difficulty of subsequent questions based on the candidate's performance. If they answered well, ask a harder question. If they struggled, ask an easier or similar difficulty question.
5.  Do not ask more than one question at a time.
6.  After approximately 3-5 questions, you can set 'isComplete' to true to indicate the round is finished. If 'isComplete' is true, still provide feedback and suggestions for the last answer but only provide a concluding remark instead of a new question.

{{/if}}

Provide your response in JSON format. Ensure all fields in the output schema are present.
`,
});

const aiMockInterviewCoachingFlow = ai.defineFlow(
  {
    name: 'aiMockInterviewCoachingFlow',
    inputSchema: AIMockInterviewCoachingInputSchema,
    outputSchema: AIMockInterviewCoachingOutputSchema,
  },
  async (input) => {
    const { output } = await aiMockInterviewCoachingPrompt(input);

    if (!output) {
      throw new Error('AI mock interview coach did not return a valid output.');
    }

    // Ensure 'feedback' and 'suggestions' are empty for the initial call, as requested.
    // The prompt handles this mostly, but an explicit check provides robustness.
    if (input.isInitialCall) {
        output.feedback = output.feedback || '';
        output.suggestions = output.suggestions || '';
        output.isComplete = false; // Always false on initial call
        output.difficulty = output.difficulty || 'medium'; // Default difficulty if prompt doesn't set it
    }

    return output;
  }
);
