"use client";

import { useDeleteNotion } from "@/hooks/notion/use-delete-notion";
import { cn } from "@/lib/utils";
import { $Enums, Content } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ContentItens } from "./content-itens";
import { UpdateNotionForm } from "./forms/update-notion-form";
import { SubItensCard } from "./sub-itens-card";
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

export interface NotionIProps {
  id: string;
  title: string;
  message: string;
  status: $Enums.NotionStatus | null;
  term: Date | null;
  priority: $Enums.Priority | null;
  company: string | null;
  userId: string;
  content: Content[];
}

export function NotionCard({ notion }: { notion: NotionIProps }) {
  const [createContent, setCreateContent] = useState(false);
  const { isPending, onSubmit } = useDeleteNotion();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <Card
      className={cn("rounded-md", notion.status === "DONE" && "opacity-50")}
    >
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
      <CardContent className="text-foreground/80 space-y-4">
        <p>{notion.message}</p>
        {notion.content.length &&
          notion.content.map((itens) => (
            <ContentItens
              key={itens.id}
              content={itens}
              disable={notion.status === "DONE"}
            />
          ))}
        {!createContent && (
          <Button
            className="flex gap-1 cursor-pointer w-fit"
            size="sm"
            onClick={(set) => setCreateContent(!!set)}
            disabled={notion.status === "DONE"}
          >
            <span>Adicionar item</span>
          </Button>
        )}
        {createContent && (
          <SubItensCard notion={notion} setOpen={setCreateContent} />
        )}
        <div className="flex justify-between items-center">
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
      </CardContent>
    </Card>
  );
}
