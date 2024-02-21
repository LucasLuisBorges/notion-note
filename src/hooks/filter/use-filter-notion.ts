import { FilterSchema } from "@/schemas/filter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export function useFilterNotion() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openCompany, setOpenCompany] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const form = useForm<FilterSchema>({
    resolver: zodResolver(FilterSchema),
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClear = () => {
    form.reset();
    router.push("/");
  };

  return {
    form,
    setOpenCompany,
    openCompany,
    setOpenStatus,
    openStatus,
    handleClear,
    createQueryString,
  };
}
