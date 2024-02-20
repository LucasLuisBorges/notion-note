import { FilterSchema } from "@/schemas/filter";
import { useGlobalFilterStore } from "@/store/globalFilterStores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useFilterNotion() {
  const { company, status, setFilter } = useGlobalFilterStore();

  const [openCompany, setOpenCompany] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const form = useForm<FilterSchema>({
    resolver: zodResolver(FilterSchema),
  });

  const handleClear = () => {
    form.reset();
    setFilter("company", "");
    setFilter("status", "");
  };

  return {
    form,
    company,
    status,
    setFilter,
    setOpenCompany,
    openCompany,
    setOpenStatus,
    openStatus,
    handleClear,
  };
}
