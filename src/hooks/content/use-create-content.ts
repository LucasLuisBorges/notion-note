import { CreateContentSchema } from "@/schemas/content";
import { createContent } from "@/server/actions/content/create-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useCreateContent(notionId: string) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateContentSchema>({
    resolver: zodResolver(CreateContentSchema),
    defaultValues: {
      title: "",
      check: false,
      notionId: notionId,
    },
  });

  const onSubmit = async (values: CreateContentSchema) => {
    startTransition(async () => {
      const response = await createContent({ values });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        router.refresh();
        form.reset();
        toast.success("Item criado com sucesso!");
      }
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
}
