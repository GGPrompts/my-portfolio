import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="glass border-primary/30 hover:border-primary/50"
          asChild
        >
          <Link href="/">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      {children}
    </>
  )
}