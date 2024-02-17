import { CreateNotionSchema } from "@/schemas/notion";
import { createNotion } from "@/server/actions/notion/create-notion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useCreateAccount() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateNotionSchema>({
    resolver: zodResolver(CreateNotionSchema),
    defaultValues: {
      title: "",
      message: "",
      status: undefined,
      term: "",
      userId: "",
    },
  });

  const onSubmit = async (values: CreateNotionSchema) => {
    startTransition(async () => {
      const response = await createNotion({ values });
      console.log({ response });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Anotação criada com sucesso!");
      }
    });
  };

  return {
    isPending,
    onSubmit,
    form,
  };
}
