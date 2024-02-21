import { getNotionsByUser } from "@/server/actions/notion/get-notions-by-user";
import { priorityValue } from "@/utils/priority";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Filter } from "../filter";
import { NotionCard } from "../notion-card";

export async function Notion({
  params,
}: {
  params?: { company?: string; status?: string };
}) {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  const { body: notions } = await getNotionsByUser({ userId });

  const notionFiltered = notions?.filter((notion) => {
    if (!params?.company && !params?.status) {
      return notion;
    }

    if (params.company && !params.status) {
      return notion.company === params?.company;
    }

    if (params.status && !params.company) {
      return notion.status === params?.status;
    }

    return (
      notion.company === params?.company && notion.status === params?.status
    );
  });

  const sortedNotionFiltered = notionFiltered?.sort((a, b) => {
    if (a.status === "DONE" && b.status !== "DONE") {
      return 1;
    } else if (a.status !== "DONE" && b.status === "DONE") {
      return -1;
    } else {
      const priorityA = a.priority ?? "LOW";
      const priorityB = b.priority ?? "LOW";

      if (priorityA !== priorityB) {
        return priorityValue(priorityB) - priorityValue(priorityA);
      } else {
        return 0;
      }
    }
  });

  return (
    <section className="relative space-y-10">
      <Filter notion={notions!} />
      <div className="flex flex-col w-full gap-5">
        {!sortedNotionFiltered?.length && (
          <h1 className="text-center text-foreground/80">
            Nenhuma anotação criada
          </h1>
        )}
        {sortedNotionFiltered?.map((notion) => (
          <NotionCard key={notion.id} notion={notion} />
        ))}
      </div>
    </section>
  );
}
