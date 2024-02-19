import { useTransition } from "react";
import { toast } from "sonner";

import { deleteNotion } from "@/server/actions/notion/delete-notion";
import { useRouter } from "next/navigation";

export function useDeleteNotion() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async ({ id }: { id: string }) => {
    startTransition(async () => {
      const response = await deleteNotion(id);
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
      }
    });
  };

  return { isPending, onSubmit };
}
