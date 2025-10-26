'use server';

import { provideContextualUnderstanding } from '@/ai/flows/provide-contextual-understanding';
import { summarizeSearchResults } from '@/ai/flows/summarize-search-results';
import { mockEmails, type Email } from '@/lib/mock-data';

export async function search(
  query: string
): Promise<{ summary: string; results: Email[] }> {
  // 1. Convert mock data to a string format for the AI context
  const emailDataString = mockEmails
    .map(
      (email) =>
        `ID: ${email.id}, From: ${email.from.name}, Subject: ${email.subject}, Body: ${email.body}`
    )
    .join('\n---\n');

  // 2. Call the contextual understanding flow
  const contextualResult = await provideContextualUnderstanding({
    query,
    emailData: emailDataString,
  });

  // 3. Filter results based on the AI's understanding
  // This is a simple implementation. A real app might get IDs back from the AI.
  const relevantResults = mockEmails.filter((email) =>
    contextualResult.relevantResults.includes(email.subject) ||
    contextualResult.relevantResults.includes(email.from.name) ||
    contextualResult.relevantResults.includes(email.id)
  );

  // If no results, return empty
  if (relevantResults.length === 0) {
    return { summary: 'No relevant results found.', results: [] };
  }
  
  // 4. Summarize the content of the relevant results
  const contentsToSummarize = relevantResults.map(
    (email) => `From: ${email.from.name}\nSubject: ${email.subject}\n${email.body}`
  );

  const summaryResult = await summarizeSearchResults({
    query,
    contents: contentsToSummarize,
  });

  // 5. Return the summary and the filtered results
  return {
    summary: summaryResult.summary,
    results: relevantResults,
  };
}
