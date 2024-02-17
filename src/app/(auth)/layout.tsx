import type { ReactNode } from "react";

export default function AuthPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full bg-background items-center justify-center">
      {children}
    </div>
  );
}
