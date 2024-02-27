import { UpdateContentSchema } from "@/schemas/content";
import { updateContent } from "@/server/actions/content/update-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useUpdateContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateContentSchema>({
    resolver: zodResolver(UpdateContentSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: UpdateContentSchema) => {
    startTransition(async () => {
      const response = await updateContent({
        values,
      });

      if (response.status === "error") {
        toast.error(response.message);
      } else {
        router.refresh();
        toast.success("Anotação atualizada com sucesso!");
      }
    });
  };

  return {
    isPending,
    onSubmit,
    form,
  };
}
