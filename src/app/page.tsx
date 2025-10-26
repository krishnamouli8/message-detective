import { redirect } from 'next/navigation';

export default function Home() {
  // In a real app, you would check for an active session.
  // For this example, we'll redirect to the login page to show the auth flow.
  redirect('/login');
  return null;
}
