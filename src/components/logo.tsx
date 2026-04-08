import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <span className="font-headline text-xl font-bold">F</span>
      </div>
      <span className="hidden font-headline text-xl font-bold sm:inline-block">
        Forge Flow
      </span>
    </Link>
  );
}
