import { CreateNotionSchema } from "@/schemas/notion";
import { createNotion } from "@/server/actions/notion/create-notion";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

export function useCreateNotion() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CreateNotionSchema>({
    resolver: zodResolver(CreateNotionSchema),
    defaultValues: {
      title: "",
      message: "",
      status: undefined,
      term: undefined,
    },
  });

  const onSubmit = async (values: CreateNotionSchema) => {
    startTransition(async () => {
      const response = await createNotion({ values, userId });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        setIsOpen(false);
        router.refresh();
        toast.success("Anotação criada com sucesso!");
      }
    });
  };

  return {
    isPending,
    onSubmit,
    form,
    NotionStatus,
    isOpen,
    setIsOpen,
    NotionPriority,
  };
}
