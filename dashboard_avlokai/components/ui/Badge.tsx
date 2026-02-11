import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "destructive" | "outline" | "secondary";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    return (
        <div className={cn(
            "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
            "transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            "hover:scale-[1.03]",
            variant === "default" && "border-transparent bg-[#3B82F6]/12 text-[#3B82F6]",
            variant === "secondary" && "border-transparent bg-[#1E293B] text-[#94A3B8]",
            variant === "destructive" && "border-transparent bg-[#EF4444]/10 text-[#EF4444]",
            variant === "success" && "border-transparent bg-[#22C55E]/10 text-[#22C55E]",
            variant === "warning" && "border-transparent bg-[#F59E0B]/10 text-[#F59E0B]",
            variant === "outline" && "border-[rgba(255,255,255,0.1)] text-[#CBD5E1] bg-transparent",
            className
        )}>
            {children}
        </div>
    );
}

