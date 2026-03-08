export function Stats() {
  const stats = [
    { value: "99.9%", label: "Detection Accuracy" },
    { value: "<50ms", label: "Avg Response Time" },
    { value: "10K+", label: "Attack Patterns" },
    { value: "Open", label: "Source License" },
  ]

  return (
    <section className="border-y border-border bg-muted/30 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
