import { useDeleteContent } from "@/hooks/content/use-delete-content";
import { useUpdateContent } from "@/hooks/content/use-update-content";
import { cn } from "@/lib/utils";
import { Content } from "@prisma/client";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Label } from "./ui/label";

export function ContentItens({
  content,
  disable,
}: {
  content: Content;
  disable: boolean;
}) {
  const { isPending: isPendingDelete, onSubmit: deleteContent } =
    useDeleteContent();
  const { form, onSubmit, isPending } = useUpdateContent();

  useEffect(() => {
    if (content) {
      form.reset({
        id: content.id,
        title: content.title,
        check: content.check,
      });
    }
  }, [content, form]);

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Button
          disabled={isPendingDelete || disable}
          size="icon"
          variant="ghost"
          onClick={() => deleteContent({ id: content.id })}
        >
          <TrashIcon className="w-5 h-5 text-red-500 cursor-pointer" />
        </Button>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="check"
              render={({ field }) => (
                <FormItem className="items-center flex">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      disabled={isPending || disable}
                      type="submit"
                      id={content.id}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Label
          htmlFor={content.id}
          className={cn("line-clamp-1", content.check && "line-through")}
        >
          {content.title}
        </Label>
      </div>
    </div>
  );
}
