import Link from "next/link"
import { ShieldCheck, ArrowRight, Lock, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Open Source Security for LLMs</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl lg:text-6xl">
            Protect Your LLMs from
            <span className="text-primary"> Malicious Attacks</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            LLM-GUARD is an advanced security layer that shields your AI applications from prompt injections, 
            jailbreaks, and adversarial attacks. Deploy with confidence.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://github.com/Lokesh12-06/LLM-GUARD"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-medium transition-colors hover:bg-muted"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Prompt Injection Detection</p>
              <p className="text-sm text-muted-foreground">Block malicious inputs</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Jailbreak Prevention</p>
              <p className="text-sm text-muted-foreground">Secure your AI models</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Real-time Analysis</p>
              <p className="text-sm text-muted-foreground">Instant threat detection</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
