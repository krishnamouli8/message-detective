'use server';

/**
 * @fileOverview Implements the AI-powered contextual understanding for the Email Detective app.
 *
 * This file defines a Genkit flow that uses RAG (Retrieval-Augmented Generation) and embeddings
 * to enhance search queries with context, synonyms, and fuzzy memory for finding relevant emails,
 * messages, and files.
 *
 * - `provideContextualUnderstanding`: The main function to process the search query and return relevant results.
 * - `ContextualUnderstandingInput`: The input type for the `provideContextualUnderstanding` function.
 * - `ContextualUnderstandingOutput`: The output type for the `provideContextualUnderstanding` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const ContextualUnderstandingInputSchema = z.object({
  query: z.string().describe('The user\s search query.'),
  emailData: z.string().describe('The email data to be searched.'),
});
export type ContextualUnderstandingInput = z.infer<typeof ContextualUnderstandingInputSchema>;

// Define the output schema
const ContextualUnderstandingOutputSchema = z.object({
  enhancedQuery: z.string().describe('The enhanced search query with added context.'),
  relevantResults: z.string().describe('The relevant email and message results.'),
});
export type ContextualUnderstandingOutput = z.infer<typeof ContextualUnderstandingOutputSchema>;

// Define the main function
export async function provideContextualUnderstanding(
  input: ContextualUnderstandingInput
): Promise<ContextualUnderstandingOutput> {
  return provideContextualUnderstandingFlow(input);
}

// Define the prompt
const contextualUnderstandingPrompt = ai.definePrompt({
  name: 'contextualUnderstandingPrompt',
  input: {schema: ContextualUnderstandingInputSchema},
  output: {schema: ContextualUnderstandingOutputSchema},
  prompt: `You are an AI assistant designed to enhance search queries for emails and messages.

  The user is searching for: {{{query}}}

  Here is the available email data: {{{emailData}}}

  Based on the user's query and the email data, generate an enhanced search query that includes context, synonyms,
  and considers fuzzy memory to find the most relevant information. Also, identify the most relevant email and message results.

  Enhanced Query:
  Relevant Results:`, // Ensure the output format matches the schema descriptions
});

// Define the flow
const provideContextualUnderstandingFlow = ai.defineFlow(
  {
    name: 'provideContextualUnderstandingFlow',
    inputSchema: ContextualUnderstandingInputSchema,
    outputSchema: ContextualUnderstandingOutputSchema,
  },
  async input => {
    const {output} = await contextualUnderstandingPrompt(input);
    return output!;
  }
);
