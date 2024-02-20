"use client";

import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  return (
    <header className="relative">
      <div className="md:block fixed z-50 bg-card/80 top-0 inset-x-0 rounded-b-2xl max-w-screen-xl mx-auto p-4">
        <div className="items-center flex justify-between">
          <h1 className="text-xl font-bold">Notion Note</h1>

          <UserButton />
        </div>
      </div>
    </header>
  );
}
