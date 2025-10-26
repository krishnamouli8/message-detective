import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

const connectedAccounts = [
  { name: 'Gmail', email: 'sherlock@gmail.com', icon: 'G' },
  { name: 'Outlook', email: 'sherlock@outlook.com', icon: 'O' },
  { name: 'Slack', workspace: 'ACME Inc.', icon: 'S' },
];

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <Card className="bg-mica">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage the email and messaging accounts connected to Email
            Detective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedAccounts.map((account) => (
              <div
                key={account.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-bold text-lg">
                    {account.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{account.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {account.email || account.workspace}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Connect New Account
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-mica">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue="Sherlock Holmes" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="sherlock@emaildetective.com" />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
