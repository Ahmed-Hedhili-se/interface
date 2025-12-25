'use server';

/**
 * @fileOverview Implements an interactive portfolio assistant flow that answers personalized questions about the developer's experience and projects.
 *
 * - interactivePortfolioAssistant - A function that handles the question answering process.
 * - InteractivePortfolioAssistantInput - The input type for the interactivePortfolioAssistant function.
 * - InteractivePortfolioAssistantOutput - The return type for the interactivePortfolioAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractivePortfolioAssistantInputSchema = z.object({
  question: z.string().describe('The user question about the developer or their projects.'),
});
export type InteractivePortfolioAssistantInput = z.infer<typeof InteractivePortfolioAssistantInputSchema>;

const InteractivePortfolioAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant answer to the user question.'),
});
export type InteractivePortfolioAssistantOutput = z.infer<typeof InteractivePortfolioAssistantOutputSchema>;

export async function interactivePortfolioAssistant(input: InteractivePortfolioAssistantInput): Promise<InteractivePortfolioAssistantOutput> {
  return interactivePortfolioAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactivePortfolioAssistantPrompt',
  input: {schema: InteractivePortfolioAssistantInputSchema},
  output: {schema: InteractivePortfolioAssistantOutputSchema},
  prompt: `You are a helpful AI assistant answering questions about the portfolio of a software developer.
  Use the provided context to answer the user's question to the best of your ability.
  If the question is not related to the developer's experience or projects, respond that you are unable to answer.

  Question: {{{question}}}
  `,
});

const interactivePortfolioAssistantFlow = ai.defineFlow(
  {
    name: 'interactivePortfolioAssistantFlow',
    inputSchema: InteractivePortfolioAssistantInputSchema,
    outputSchema: InteractivePortfolioAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
