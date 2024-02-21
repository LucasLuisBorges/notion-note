"use client";

import { useFilterNotion } from "@/hooks/filter/use-filter-notion";
import { cn } from "@/lib/utils";
import { Notion } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type DataType = {
  id: string;
  title: string;
};

export function Filter({ notion }: { notion: Notion[] }) {
  const [companiesData, setCompaniesData] = useState<DataType[]>([]);
  const [statusData, setStatusData] = useState<DataType[]>([]);

  const router = useRouter();

  const {
    form,
    handleClear,
    openCompany,
    setOpenCompany,
    openStatus,
    setOpenStatus,
    createQueryString,
  } = useFilterNotion();

  useEffect(() => {
    const uniqueCompanies = new Map<string, string>();
    const uniqueStatus = new Map<string, string>();

    notion.forEach((item) => {
      if (item.company !== null && !uniqueCompanies.has(item.company)) {
        uniqueCompanies.set(item.company, generateRandomId());
      }

      if (item.status !== null && !uniqueStatus.has(item.status)) {
        uniqueStatus.set(item.status, generateRandomId());
      }
    });

    const companiesArray = Array.from(uniqueCompanies).map(([title, id]) => ({
      id,
      title,
    }));

    const statusArray = Array.from(uniqueStatus).map(([title, id]) => ({
      id,
      title,
    }));

    setCompaniesData(companiesArray);
    setStatusData(statusArray);
  }, []);

  function generateRandomId(): string {
    return Math.random().toString(36).substring(7);
  }

  return (
    <Form {...form}>
      <form className="flex items-center gap-2">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem className="w-[250px] space-y-0">
              <FormLabel className="text-sm font-bold">Empresa:</FormLabel>
              <FormControl>
                <Popover open={openCompany} onOpenChange={setOpenCompany}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCompany}
                      className="w-full justify-between rounded-xl py-3"
                    >
                      {companiesData?.find(
                        (framework) => framework.id === field.value
                      )?.title || "---"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div>
                      <Command>
                        <CommandInput placeholder="Buscar empresa..." />
                        <CommandEmpty>Nenhuma empresa encontrado.</CommandEmpty>
                        <CommandGroup>
                          {companiesData?.map((framework) => (
                            <CommandItem
                              value={framework.id}
                              key={framework.id}
                              onSelect={(value) => {
                                field.onChange(value);
                                router.push(
                                  "?" +
                                    createQueryString(
                                      "company",
                                      framework.title
                                    )
                                );
                                setOpenCompany(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === framework.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-[250px] space-y-0">
              <FormLabel className="text-sm font-bold">Status:</FormLabel>
              <FormControl>
                <Popover open={openStatus} onOpenChange={setOpenStatus}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openStatus}
                      className="w-full justify-between rounded-xl py-3"
                    >
                      {statusData?.find(
                        (framework) => framework.id === field.value
                      )?.title || "---"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div>
                      <Command>
                        <CommandInput placeholder="Buscar status..." />
                        <CommandEmpty>Nenhum status encontrado.</CommandEmpty>
                        <CommandGroup>
                          {statusData?.map((framework) => (
                            <CommandItem
                              value={framework.id}
                              key={framework.id}
                              onSelect={(value) => {
                                router.push(
                                  "?" +
                                    createQueryString("status", framework.title)
                                );
                                field.onChange(value);
                                setOpenStatus(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === framework.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.title}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </div>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        {(form.getValues("company") || form.getValues("status")) && (
          <button className="h-fit pt-5" type="button" onClick={handleClear}>
            Limpar
          </button>
        )}
      </form>
    </Form>
  );
}
