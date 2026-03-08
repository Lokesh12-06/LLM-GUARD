import Link from "next/link"
import { ArrowRight, Github } from "lucide-react"

export function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center md:px-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Secure Your LLM Applications?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Join developers worldwide who trust LLM-GUARD to protect their AI applications. 
            Open source, free to use, and constantly improving.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com/Lokesh12-06/LLM-GUARD"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </Link>
            <Link
              href="https://github.com/Lokesh12-06/LLM-GUARD#readme"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-medium transition-colors hover:bg-muted"
            >
              Read Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
