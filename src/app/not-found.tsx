'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex items-center justify-center bg-background text-primary rounded-xl h-[80vh]">
      <div className="bg-foreground p-14 shadow-md rounded-md space-y-4">
        <h1 className="text-3xl font-bold">404 - Página não encontrada</h1>
        <p className="text-primary">A página que você está procurando não foi encontrada.</p>
        <Button onClick={() => router.push('/')} className="px-4 py-2 text-secondary">
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  )
}