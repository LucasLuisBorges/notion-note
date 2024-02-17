"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAccount } from "@/hooks/auth/use-create-account";
import { GradientWrapper } from "../gradient-wrapper";
import { LayoutEffect } from "../layout-effect";

export function SignUpForm() {
  const router = useRouter();
  const { isPending, onSubmit, form } = useCreateAccount();

  return (
    <LayoutEffect
      className="duration-1000 delay-300"
      isInviewState={{
        trueState: "opacity-1",
        falseState: "opacity-0",
      }}
    >
      <div>
        <GradientWrapper wrapperClassName="max-w-3xl h-[200px] top-12 inset-0 sm:h-[200px] lg:h-[400px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="flex itens-center gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Primeiro nome</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Lucas"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>
                          Sobrenome <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="Borges"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="email"
                          placeholder="lucasborges@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={router.back}>
                  Cancelar
                </Button>

                <Button loading type="submit" disabled={isPending}>
                  {isPending && <div className="loading" />}
                  Criar conta
                </Button>
              </div>
            </form>
          </Form>
        </GradientWrapper>
      </div>
    </LayoutEffect>
  );
}
