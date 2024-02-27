import { useTransition } from "react";
import { toast } from "sonner";

import { deleteContent } from "@/server/actions/content/delete-content";
import { useRouter } from "next/navigation";

export function useDeleteContent() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async ({ id }: { id: string }) => {
    startTransition(async () => {
      const response = await deleteContent(id);
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
