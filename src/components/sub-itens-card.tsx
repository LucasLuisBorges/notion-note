import { useCreateContent } from "@/hooks/content/use-create-content";
import { Notion } from "@prisma/client";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { ItemInput } from "./ui/item-input";

export function SubItensCard({
  notion,
  setOpen,
}: {
  notion: Notion;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { form, onSubmit, isPending } = useCreateContent(notion.id);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full justify-between items-center"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <FormLabel>
                Titulo <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <ItemInput
                  {...field}
                  disabled={isPending}
                  placeholder="Adicionar um item"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
          type="button"
        >
          <XIcon className="text-red-500" />
        </Button>
      </form>
    </Form>
  );
}
