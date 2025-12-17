import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoaderComponent({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center font-semibold text-slate-700 text-2xl">
        <p>semiful.com</p>
        <span className="text-slate-300">/</span>
        <LoaderCircle
          className="shrink-0 size-5 animate-spin text-slate-300"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
