import { getNotionsByUser } from "@/server/actions/notion/get-notions-by-user";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CreateNotionForm } from "../forms/create-notion-form";
import { NotionCard } from "../notion-card";

export async function Notion() {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const res = await getNotionsByUser({ userId });
  const notions = res.body;

  return (
    <section className="relative space-y-10">
      <div className="flex justify-end">
        <CreateNotionForm />
      </div>

      <div className="flex flex-col w-full gap-5">
        {!notions?.length && (
          <h1 className="text-center text-foreground/80">
            Nenhuma anotação criada
          </h1>
        )}
        {notions?.map((notion) => (
          <NotionCard key={notion.id} notion={notion} />
        ))}
      </div>
    </section>
  );
}