import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { UpdateNotionSchema } from "@/schemas/notion";
import { updateNotion } from "@/server/actions/notion/update-notion";
import { zodResolver } from "@hookform/resolvers/zod";

const NotionStatus = [
  {
    value: "BACKLOG",
    label: "ESPERA",
  },
  {
    value: "PENDING",
    label: "PENDENTE",
  },
  {
    value: "RUNNING",
    label: "DESENVOLVIMENTO",
  },
  {
    value: "REVIEW",
    label: "ANALISE",
  },
  {
    value: "DONE",
    label: "PRONTO",
  },
];

const NotionPriority = [
  {
    value: "HIGHT",
    label: "ALTA",
  },
  {
    value: "MEDIUM",
    label: "MÉDIO",
  },
  {
    value: "LOW",
    label: "BAIXA",
  },
];

export function useUpdateNotion() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<UpdateNotionSchema>({
    resolver: zodResolver(UpdateNotionSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: UpdateNotionSchema) => {
    startTransition(async () => {
      const response = await updateNotion({
        values,
        userId,
      });

      if (response.status === "error") {
        toast.error(response.message);
      } else {
        setIsOpen(false);
        router.refresh();
        toast.success("Anotação atualizada com sucesso!");
      }
    });
  };

  return {
    isPending,
    onSubmit,
    form,
    setIsOpen,
    isOpen,
    NotionStatus,
    NotionPriority,
  };
}
