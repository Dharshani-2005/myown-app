'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating various study and learning content.
 *
 * - generateStudyContent - A function that orchestrates the generation of study content.
 * - GenerateStudyContentInput - The input type for the generateStudyContent function.
 * - GenerateStudyContentOutput - The return type for the generateStudyContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema for the study content generation flow.
const GenerateStudyContentInputSchema = z.object({
  studyMaterial: z.string().optional().describe('The comprehensive study notes or material provided by the student.'),
  latexFormula: z.string().optional().describe('An optional LaTeX formula that requires a step-by-step animated explanation.'),
});
export type GenerateStudyContentInput = z.infer<typeof GenerateStudyContentInputSchema>;

// Output Schema for the study content generation flow.
const GenerateStudyContentOutputSchema = z.object({
  summary: z.string().optional().describe('A concise summary of the provided study material.'),
  videoScript: z.string().optional().describe('A detailed video script for an educational video, derived from the study material.'),
  visualSceneDescriptions: z.array(z.string()).optional().describe('An array of detailed descriptions for each scene in the video script, intended for AI image generation.'),
  mockTest: z.array(z.object({
    question: z.string().describe('The question for the mock test.'),
    options: z.array(z.string()).describe('An array of possible answers for the question.'),
    correctAnswer: z.string().describe('The correct answer to the question.'),
  })).optional().describe('A set of multiple-choice questions for a mock test, based on the study material.'),
  flashcards: z.array(z.object({
    front: z.string().describe('The front side of the flashcard (question or term).'),
    back: z.string().describe('The back side of the flashcard (answer or definition).'),
  })).optional().describe('A set of revision flashcards derived from the study material.'),
  formulaExplanation: z.string().optional().describe('A step-by-step animated explanation of the provided LaTeX formula.'),
}).describe('Structured output containing various types of generated educational content.');
export type GenerateStudyContentOutput = z.infer<typeof GenerateStudyContentOutputSchema>;

// Wrapper function to call the Genkit flow.
export async function generateStudyContent(input: GenerateStudyContentInput): Promise<GenerateStudyContentOutput> {
  return generateStudyContentFlow(input);
}

// Define the prompt for the AI model.
const generateStudyContentPrompt = ai.definePrompt({
  name: 'generateStudyContentPrompt',
  input: { schema: GenerateStudyContentInputSchema },
  output: { schema: GenerateStudyContentOutputSchema },
  prompt: `You are an expert educational content creator and a brilliant tutor. Your task is to process study material and/or LaTeX formulas provided by a student and generate highly structured educational content in JSON format.

Prioritize providing content for the input that is present. If 'studyMaterial' is provided, generate a summary, a video script with visual scene descriptions, a mock test, and flashcards. If 'latexFormula' is provided, generate a step-by-step explanation. If both are provided, generate content for both.

**Instructions for Study Material Content:**
- **Summary:** Provide a concise, clear, and comprehensive summary.
- **Video Script:** Create an engaging educational video script. Break it down into scenes. For each scene, include a clear narrative.
- **Visual Scene Descriptions:** Provide an array of detailed, single-sentence descriptions, where each description corresponds to a distinct visual element for a scene mentioned in the `videoScript`. These descriptions should be vivid and suitable for guiding an AI image generation model (e.g., "A student happily studying with books floating around them.", "An animated diagram showing the derivation of Euler's formula."). Ensure the order of descriptions aligns with the progression of the video script.
- **Mock Test:** Generate 3-5 multiple-choice questions from the study material. Each question should have 3-4 options and a single correct answer.
- **Flashcards:** Generate 3-5 flashcards from the study material. Each flashcard should have a 'front' (term or question) and a 'back' (definition or answer).

**Instructions for LaTeX Formula Explanation:**
- **Formula Explanation:** Provide a clear, step-by-step explanation of the LaTeX formula. Assume the explanation is for a student who needs to understand the derivation or meaning of each part, suitable for an animated explainer. Use clear, simple language.

Output the content STRICTLY in JSON format, adhering to the provided schema. Ensure all string values are properly escaped within the JSON. If a specific output field (like 'summary', 'mockTest', etc.) cannot be generated due to missing input or irrelevance, omit that field from the JSON output.

---

Study Material:
{{{studyMaterial}}}

---

LaTeX Formula:
{{{latexFormula}}}

---
`,
  model: 'googleai/gemini-1.5-flash',
});

// Define the Genkit flow.
const generateStudyContentFlow = ai.defineFlow(
  {
    name: 'generateStudyContentFlow',
    inputSchema: GenerateStudyContentInputSchema,
    outputSchema: GenerateStudyContentOutputSchema,
  },
  async (input) => {
    // Call the prompt with the input.
    const { output } = await generateStudyContentPrompt(input);

    // Genkit's prompt function already handles parsing the JSON output based on the outputSchema.
    // If the output from the model is null or undefined, handle it appropriately.
    if (!output) {
      throw new Error('AI model did not return any output.');
    }

    return output;
  }
);
