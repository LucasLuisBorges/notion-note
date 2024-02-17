import { SignUpSchema } from "@/schemas/auth";
import { createAccount } from "@/server/actions/auth/create-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useCreateAccount() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchema) => {
    startTransition(async () => {
      const response = await createAccount({ values });
      console.log({ response });
      if (response.status === "error") {
        toast.error(response.message);
      } else {
        toast.success("Conta criada com sucesso!");
      }
    });
  };

  return {
    isPending,
    onSubmit,
    form,
  };
}
