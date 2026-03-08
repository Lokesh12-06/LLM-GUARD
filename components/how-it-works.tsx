import { ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Input Analysis",
    description:
      "Every user prompt is analyzed in real-time using multiple detection algorithms to identify potential threats.",
  },
  {
    number: "02",
    title: "Threat Classification",
    description:
      "Detected threats are classified by type and severity, including prompt injections, jailbreaks, and adversarial patterns.",
  },
  {
    number: "03",
    title: "Action & Response",
    description:
      "Based on your security policies, threats are blocked, sanitized, or flagged while safe prompts proceed normally.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">How LLM-GUARD Works</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A seamless security layer that integrates with your existing LLM pipeline without impacting performance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <div className="rounded-2xl border border-border bg-card p-8">
                <span className="mb-4 block text-4xl font-bold text-primary/30">{step.number}</span>
                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 md:block">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Code example */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-sm text-muted-foreground">example.py</span>
          </div>
          <pre className="overflow-x-auto p-6 text-sm">
            <code className="text-muted-foreground">
              <span className="text-primary">from</span> llmguard <span className="text-primary">import</span> LLMGuard{"\n\n"}
              <span className="text-muted-foreground/60"># Initialize the guard</span>{"\n"}
              guard = LLMGuard(){"\n\n"}
              <span className="text-muted-foreground/60"># Analyze incoming prompt</span>{"\n"}
              result = guard.analyze(user_prompt){"\n\n"}
              <span className="text-primary">if</span> result.is_safe:{"\n"}
              {"    "}response = llm.generate(user_prompt){"\n"}
              <span className="text-primary">else</span>:{"\n"}
              {"    "}<span className="text-primary">print</span>(<span className="text-accent">{'"Threat detected:"'}</span>, result.threat_type)
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
