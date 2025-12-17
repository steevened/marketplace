import { cn } from "@/lib/utils";

export default function BrandText({ className }: { className?: string }) {
  return (
    <span className={cn("truncate font-semibold text-slate-700", className)}>
      semiful.com<span className="text-slate-300">/ec</span>
    </span>
  );
}
