"use client";
import { useDeleteNotion } from "@/hooks/notion/use-delete-notion";
import { Notion } from "@prisma/client";
import { Trash } from "lucide-react";
import { UpdateNotionForm } from "./forms/update-notion-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const statusMapping: Record<string, string> = {
  BACKLOG: "ESPERA",
  PENDING: "PENDENTE",
  RUNNING: "DESENVOLVIMENTO",
  REVIEW: "ANALISE",
  DONE: "PRONTO",
};

const priorityMapping: Record<string, string> = {
  LOW: "BAIXA",
  MEDIUM: "MÉDIO",
  HIGHT: "ALTA",
};

export function NotionCard({ notion }: { notion: Notion }) {
  const { isPending, onSubmit } = useDeleteNotion();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Card className="rounded-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle>{notion.title}</CardTitle>
          {notion.company && <span>Empresa: {notion.company}</span>}
        </div>
        <div className="flex gap-2">
          <UpdateNotionForm notion={notion} />
          <Button
            variant="destructive"
            size="icon"
            className="flex gap-2 text-white"
            disabled={isPending}
            onClick={() => onSubmit({ id: notion.id })}
          >
            <Trash size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-foreground/80">{notion.message}</CardContent>
      <div className="flex justify-between items-center p-6">
        <div className="flex flex-col space-y-1">
          <span>
            Prioridade:{" "}
            {priorityMapping[notion.priority ?? ""] ?? notion.priority}
          </span>
          <span>
            Status: {statusMapping[notion.status ?? ""] ?? notion.status}
          </span>
        </div>
        <div>
          {notion.term && (
            <span className="text-foreground/80">
              Prazo: {formatDate(String(notion.term))}
            </span>
          )}

          {!notion.term && (
            <span className="text-foreground/80">Prazo não definido</span>
          )}
        </div>
      </div>
    </Card>
  );
}
