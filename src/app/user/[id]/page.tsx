'use client';
import { useParams } from 'next/navigation';

export default function UserPage() {
  const params = useParams();
  const { id } = params;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-lg">
        Viewing user with ID: <span className="font-mono">{id}</span>
      </p>
    </main>
  );
}
