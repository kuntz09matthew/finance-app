import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance App | Dashboard",
  description: "Your household financial overview and insights.",
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100 mb-4">
          Dashboard
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-300 mb-8">
          Here you’ll see a summary of your accounts, income, expenses, and goals.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <span className="text-zinc-500 dark:text-zinc-400">(Dashboard widgets coming soon)</span>
        </div>
      </main>
    </div>
  );
}
