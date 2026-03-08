import { ShieldAlert, Fingerprint, FileSearch, Brain, Layers, Settings } from "lucide-react"

const features = [
  {
    icon: ShieldAlert,
    title: "Prompt Injection Detection",
    description:
      "Identifies and blocks attempts to manipulate your LLM through carefully crafted malicious prompts that try to override system instructions.",
  },
  {
    icon: Fingerprint,
    title: "Jailbreak Prevention",
    description:
      "Detects sophisticated jailbreak attempts designed to bypass safety measures and extract unauthorized responses from your AI models.",
  },
  {
    icon: FileSearch,
    title: "Content Filtering",
    description:
      "Scans inputs and outputs for harmful, inappropriate, or policy-violating content to maintain safe and compliant AI interactions.",
  },
  {
    icon: Brain,
    title: "Adversarial Attack Detection",
    description:
      "Recognizes and neutralizes adversarial inputs designed to fool or mislead your language models into producing incorrect outputs.",
  },
  {
    icon: Layers,
    title: "Multi-Layer Security",
    description:
      "Implements defense-in-depth with multiple security layers working together to provide comprehensive protection for your LLM applications.",
  },
  {
    icon: Settings,
    title: "Easy Integration",
    description:
      "Simple API and SDK integration with popular frameworks. Get up and running in minutes with minimal configuration required.",
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Comprehensive Security Features
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Protect your AI applications with enterprise-grade security capabilities designed specifically for large language models.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
