type FloatingCodeBackgroundProps = { density?: "low" | "medium" | "high"; opacity?: "subtle" | "soft"; variant?: "hero" | "projects" | "contact"; className?: string };

const snippets = {
  hero: ["const stack = ['React', 'Next.js']", "await api.authenticate()", "type User = { secure: true }", "database.connect('MongoDB')", "export default function App()", "jwt.verify(token)", "cloud.deploy({ region: 'global' })", "async function build() {}"],
  projects: ["<Component />", "REST API /v1/projects", "const response = await fetch()", "MongoDB.collection('apps')", "authentication: 'JWT'", "type AIResult = Success", "node server.ts", "cloud.sync()"],
  contact: ["const contact = async () =>", "await send(message)", "POST /api/contact", "response.ok", "email: 'hello@'", "message.deliver()"],
};
const densityCount = { low: 6, medium: 9, high: 13 };

export function FloatingCodeBackground({ density = "medium", opacity = "soft", variant = "hero", className = "" }: FloatingCodeBackgroundProps) {
  const items = Array.from({ length: densityCount[density] }, (_, index) => snippets[variant][index % snippets[variant].length]);
  return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>{items.map((snippet, index) => <span key={`${snippet}-${index}`} className={`floating-code floating-code-${opacity}`} style={{ left: `${(index * 37 + 9) % 104 - 8}%`, top: `${(index * 29 + 6) % 96}%`, animationDelay: `${-index * 2.4}s`, animationDuration: `${19 + (index % 5) * 4}s`, fontSize: `${0.65 + (index % 3) * 0.09}rem` }}>{snippet}</span>)}</div>;
}
