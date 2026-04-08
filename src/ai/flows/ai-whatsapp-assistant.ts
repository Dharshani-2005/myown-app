'use server';
/**
 * @fileOverview A Genkit flow for the Forge Flow WhatsApp Assistant.
 *
 * This file defines the AI logic for understanding natural language commands
 * from users via WhatsApp, extracting their intent and relevant parameters
 * for tasks such as daily summaries, note creation, deadline alerts,
 * and personalized job searches.
 *
 * - whatsappAssistant - The main function to interact with the WhatsApp assistant.
 * - WhatsAppAssistantInput - The input type for the whatsappAssistant function.
 * - WhatsAppAssistantOutput - The return type for the whatsappAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WhatsAppAssistantInputSchema = z.object({
  message: z.string().describe("The user's message from WhatsApp."),
  userId: z.string().describe("The ID of the user interacting with the bot. Used for personalization."),
});
export type WhatsAppAssistantInput = z.infer<typeof WhatsAppAssistantInputSchema>;

const WhatsAppAssistantIntentSchema = z.object({
  intent: z.enum([
    'DAILY_SUMMARY',
    'CREATE_NOTE',
    'GET_DEADLINES',
    'SEARCH_JOBS',
    'MARK_TASK_COMPLETE',
    'SHOW_TODAY_ACTIVITIES',
    'JOB_ALERT_SUBSCRIBE',
    'JOB_ALERT_UNSUBSCRIBE',
    'APPLY_JOB',
    'UNKNOWN'
  ]).describe('The command or intent identified from the user\'s message.'),
  noteContent: z.string().optional().describe('Content of the note if the intent is CREATE_NOTE.'),
  jobQuery: z.string().optional().describe('Search query for jobs if the intent is SEARCH_JOBS.'),
  taskId: z.string().optional().describe('Task ID if the intent is MARK_TASK_COMPLETE or APPLY_JOB.'),
});
export type WhatsAppAssistantIntent = z.infer<typeof WhatsAppAssistantIntentSchema>;

const WhatsAppAssistantOutputSchema = z.object({
  response: z.string().describe("The bot's natural language response to the user."),
  parsedIntent: WhatsAppAssistantIntentSchema.optional().describe('The parsed intent and parameters from the user\'s message.'),
});
export type WhatsAppAssistantOutput = z.infer<typeof WhatsAppAssistantOutputSchema>;

export async function whatsappAssistant(input: WhatsAppAssistantInput): Promise<WhatsAppAssistantOutput> {
  return whatsappAssistantFlow(input);
}

const whatsappAssistantIntentPrompt = ai.definePrompt({
  name: 'whatsappAssistantIntentPrompt',
  input: { schema: WhatsAppAssistantInputSchema },
  output: { schema: WhatsAppAssistantIntentSchema },
  prompt: `You are a helpful WhatsApp assistant named Forge Flow designed to assist engineering students. Your primary goal is to understand user commands in natural language and extract their intent along with any relevant parameters.

Here are the commands you support and how you should interpret them:
-   **DAILY_SUMMARY**: User asks for "daily summary", "what's up today", "my agenda".
-   **CREATE_NOTE**: User wants to "note down", "quick note", "remember this". The content of the note should be everything after "note" or a similar keyword.
-   **GET_DEADLINES**: User asks for "deadlines", "my upcoming tasks", "what's due".
-   **SEARCH_JOBS**: User asks to "find jobs", "job search for <query>", "jobs today", "JOBS TODAY", "JOBS AI". The search query should be extracted from the message. If no specific query, infer a general search.
-   **MARK_TASK_COMPLETE**: User says "DONE <task id>". Extract the task ID.
-   **SHOW_TODAY_ACTIVITIES**: User says "show today's activities" or "what's happening today".
-   **JOB_ALERT_SUBSCRIBE**: User explicitly says "subscribe to job alerts" or "activate job alerts".
-   **JOB_ALERT_UNSUBSCRIBE**: User explicitly says "unsubscribe job alerts" or "deactivate job alerts".
-   **APPLY_JOB**: User says "APPLY <job id>". Extract the job ID.

If the user's intent is unclear or does not match any of the above, set the intent to 'UNKNOWN'.

Your response MUST be a JSON object conforming to the following TypeScript interface:
interface WhatsAppAssistantIntent {
  intent: 'DAILY_SUMMARY' | 'CREATE_NOTE' | 'GET_DEADLINES' | 'SEARCH_JOBS' | 'MARK_TASK_COMPLETE' | 'SHOW_TODAY_ACTIVITIES' | 'JOB_ALERT_SUBSCRIBE' | 'JOB_ALERT_UNSUBSCRIBE' | 'APPLY_JOB' | 'UNKNOWN';
  noteContent?: string; // Content of the note if the intent is CREATE_NOTE.
  jobQuery?: string;    // Search query for jobs if the intent is SEARCH_JOBS.
  taskId?: string;      // Task ID if the intent is MARK_TASK_COMPLETE or APPLY_JOB.
}

Do not include any other text in your response outside the JSON object.

Example 1:
User: "What is my daily summary?"
Output: {"intent": "DAILY_SUMMARY"}

Example 2:
User: "NOTE Meeting with project team at 3 PM tomorrow."
Output: {"intent": "CREATE_NOTE", "noteContent": "Meeting with project team at 3 PM tomorrow."}

Example 3:
User: "Find jobs for software engineer in Bangalore."
Output: {"intent": "SEARCH_JOBS", "jobQuery": "software engineer in Bangalore"}

Example 4:
User: "DONE 12345"
Output: {"intent": "MARK_TASK_COMPLETE", "taskId": "12345"}

Example 5:
User: "APPLY 67890"
Output: {"intent": "APPLY_JOB", "taskId": "67890"}

Example 6:
User: "JOBS TODAY"
Output: {"intent": "SEARCH_JOBS", "jobQuery": "today"}

Example 7:
User: "Quick note: Buy groceries."
Output: {"intent": "CREATE_NOTE", "noteContent": "Buy groceries."}

User message: {{{message}}}
`,
});

const whatsappAssistantFlow = ai.defineFlow(
  {
    name: 'whatsappAssistantFlow',
    inputSchema: WhatsAppAssistantInputSchema,
    outputSchema: WhatsAppAssistantOutputSchema,
  },
  async (input) => {
    const { output: parsedIntent } = await whatsappAssistantIntentPrompt(input);

    let responseMessage: string;
    switch (parsedIntent.intent) {
      case 'DAILY_SUMMARY':
        // Placeholder for actual logic to fetch daily summary for userId
        responseMessage = `Hi ${input.userId}! Here's your daily summary: No major deadlines today. You have 1 meeting at 3 PM and a lab session at 5 PM.`;
        break;
      case 'CREATE_NOTE':
        responseMessage = parsedIntent.noteContent
          ? `Note "${parsedIntent.noteContent}" saved successfully for you, ${input.userId}.`
          : 'Please provide content for your note, e.g., "NOTE Remember to call John".';
        break;
      case 'GET_DEADLINES':
        // Placeholder for actual logic to fetch deadlines for userId
        responseMessage = `Hi ${input.userId}! You have 2 deadlines this week: Assignment 3 due Friday, and the Group Project due next Monday.`;
        break;
      case 'SEARCH_JOBS':
        responseMessage = parsedIntent.jobQuery
          ? `Searching for personalized job opportunities related to "${parsedIntent.jobQuery}" for you, ${input.userId}.`
          : 'Please specify a job query, e.g., "find jobs software engineer in Bangalore" or "JOBS AI".';
        break;
      case 'MARK_TASK_COMPLETE':
        responseMessage = parsedIntent.taskId
          ? `Task ID ${parsedIntent.taskId} has been marked as complete for you, ${input.userId}. Great job!`
          : 'To mark a task complete, please use the format "DONE <task_id>".';
        break;
      case 'SHOW_TODAY_ACTIVITIES':
        // Placeholder for actual logic to show today's activities for userId
        responseMessage = `Hi ${input.userId}! Your activities for today include: Lecture on ML at 10 AM, and a Project meeting at 3 PM.`;
        break;
      case 'JOB_ALERT_SUBSCRIBE':
        // Placeholder for actual logic to subscribe user to job alerts
        responseMessage = `You are now subscribed to personalized job alerts, ${input.userId}! You'll receive daily digests.`;
        break;
      case 'JOB_ALERT_UNSUBSCRIBE':
        // Placeholder for actual logic to unsubscribe user from job alerts
        responseMessage = `You have been unsubscribed from job alerts, ${input.userId}. You won't receive further notifications.`;
        break;
      case 'APPLY_JOB':
        responseMessage = parsedIntent.taskId
          ? `Processing your application for job ID ${parsedIntent.taskId}, ${input.userId}. We'll send you the application link shortly.`
          : 'To apply for a job, please use the format "APPLY <job_id>".';
        break;
      case 'UNKNOWN':
      default:
        responseMessage = `Hi ${input.userId}! I didn't quite understand that. Please try one of these commands: "daily summary", "NOTE <content>", "deadlines", "find jobs <query>", "DONE <task_id>", "APPLY <job_id>", "JOBS TODAY", "subscribe to job alerts".`;
        break;
    }

    return {
      response: responseMessage,
      parsedIntent: parsedIntent,
    };
  }
);
