import { CreateNotionForm } from "@/components/forms/create-notion-form";
import { Hero } from "@/components/home/hero";
import { Notion } from "@/components/home/notion";
import { Navbar } from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { company?: string; status?: string };
}) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  return (
    <main className="relative max-w-screen-xl space-y-10 mx-auto px-4 md:px-8 py-16">
      <Navbar />
      <Hero />
      <Notion params={searchParams} />
      <CreateNotionForm />
    </main>
  );
}
