'use client';

import { useState } from 'react';
import {
  FileText,
  Loader2,
  Paperclip,
  Search,
  Sparkles,
} from 'lucide-react';
import { search } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { mockEmails, type Email } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type SearchResult = {
  summary: string;
  results: Email[];
};

export default function DashboardPage() {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setSearchResult(null);
    try {
      const result = await search(query);
      setSearchResult(result);
    } catch (error) {
      console.error('Search failed:', error);
      // You could show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const getIconForSource = (source: Email['source']) => {
    switch (source) {
      case 'Gmail':
        return ' G';
      case 'Outlook':
        return ' O';
      case 'Slack':
        return ' S';
      case 'Teams':
        return ' T';
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Find anything, instantly.
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Search across all your accounts with one simple query.
        </p>
        <form
          onSubmit={handleSearch}
          className="relative mx-auto mt-6 max-w-2xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="e.g., 'Email from Sarah about Q3 budget with a spreadsheet'"
            className="w-full rounded-full bg-input py-6 pl-12 pr-24 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6 py-4 text-base transition-transform duration-200 hover:scale-105 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Search'
            )}
          </Button>
        </form>
      </section>

      {isLoading && (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">The Detective is on the case...</p>
        </div>
      )}

      {searchResult && (
        <div className="grid gap-8">
          {searchResult.summary && (
            <Card className="bg-mica">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{searchResult.summary}</p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Relevant Results ({searchResult.results.length})
            </h2>
            {searchResult.results.map((email) => {
              const avatar = PlaceHolderImages.find(
                (img) => img.id === email.from.avatarId
              );
              return (
                <Card key={email.id} className="bg-mica hover:border-primary/50 transition-colors duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 border">
                        {avatar && <AvatarImage src={avatar.imageUrl} alt={email.from.name} data-ai-hint="person portrait" />}
                        <AvatarFallback>
                          {email.from.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold">{email.from.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                                {new Date(email.timestamp).toLocaleDateString()}
                                <Badge variant="outline">{email.source}</Badge>
                            </div>
                        </div>
                        <div className="font-medium text-foreground/90">{email.subject}</div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {email.body}
                        </p>
                        {email.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                                {email.attachments.map(att => (
                                    <Badge key={att.name} variant="secondary" className="font-normal">
                                        <Paperclip className="mr-1 h-3 w-3" /> {att.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
