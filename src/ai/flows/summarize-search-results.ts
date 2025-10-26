'use server';

/**
 * @fileOverview Summarizes search results from emails and messages based on a user query.
 *
 * - summarizeSearchResults - A function that takes a query and a list of email/message contents and returns a summary highlighting the most relevant information.
 * - SummarizeSearchResultsInput - The input type for the summarizeSearchResults function.
 * - SummarizeSearchResultsOutput - The return type for the summarizeSearchResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSearchResultsInputSchema = z.object({
  query: z.string().describe('The user search query.'),
  contents: z.array(z.string()).describe('An array of email/message contents to summarize.'),
});
export type SummarizeSearchResultsInput = z.infer<typeof SummarizeSearchResultsInputSchema>;

const SummarizeSearchResultsOutputSchema = z.object({
  summary: z.string().describe('A summary of the provided contents, highlighting the most relevant information based on the user query.'),
});
export type SummarizeSearchResultsOutput = z.infer<typeof SummarizeSearchResultsOutputSchema>;

export async function summarizeSearchResults(input: SummarizeSearchResultsInput): Promise<SummarizeSearchResultsOutput> {
  return summarizeSearchResultsFlow(input);
}

const summarizeSearchResultsPrompt = ai.definePrompt({
  name: 'summarizeSearchResultsPrompt',
  input: {schema: SummarizeSearchResultsInputSchema},
  output: {schema: SummarizeSearchResultsOutputSchema},
  prompt: `You are an AI assistant that summarizes search results from emails and messages.

  Your goal is to provide a concise summary that highlights the most relevant information based on the user's query.

  User Query: {{{query}}}

  Contents:
  {{#each contents}}
  ---
  {{{this}}}
  {{/each}}
  ---

  Summary:`,
});

const summarizeSearchResultsFlow = ai.defineFlow(
  {
    name: 'summarizeSearchResultsFlow',
    inputSchema: SummarizeSearchResultsInputSchema,
    outputSchema: SummarizeSearchResultsOutputSchema,
  },
  async input => {
    const {output} = await summarizeSearchResultsPrompt(input);
    return output!;
  }
);
