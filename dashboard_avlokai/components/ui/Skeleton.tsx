import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    /** Number of skeleton lines to render */
    lines?: number;
    /** Whether to show as a circle (avatar placeholder) */
    circle?: boolean;
    /** Optional inline styles */
    style?: React.CSSProperties;
}

export function Skeleton({ className, lines = 1, circle = false, style }: SkeletonProps) {
    if (circle) {
        return (
            <div
                className={cn("skeleton-pulse rounded-full", className)}
                style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
            />
        );
    }

    if (lines > 1) {
        return (
            <div className={cn("space-y-2.5", className)}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton-pulse rounded-md"
                        style={{
                            height: "12px",
                            width: i === lines - 1 ? "60%" : "100%",
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            animationDelay: `${i * 100}ms`,
                        }}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn("skeleton-pulse rounded-md", className)}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}
        />
    );
}

/** Full skeleton for a KPI card */
export function KPICardSkeleton() {
    return (
        <div
            className="rounded-xl p-6"
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-20" />
        </div>
    );
}

/** Full skeleton for a table row */
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <tr>
            {Array.from({ length: columns }).map((_, i) => (
                <td key={i} className="px-6 py-3.5">
                    <Skeleton
                        className="h-3"
                        style={{
                            width: i === 0 ? "140px" : i === columns - 1 ? "60px" : "80px",
                            animationDelay: `${i * 80}ms`,
                        } as React.CSSProperties}
                    />
                </td>
            ))}
        </tr>
    );
}

/** Skeleton for a workflow card */
export function WorkflowCardSkeleton() {
    return (
        <div
            className="rounded-xl p-6"
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <div className="flex-1 space-y-2.5">
                    <div className="flex items-center gap-2.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-5 w-14 rounded-md" />
                    </div>
                    <Skeleton className="h-3 w-64" />
                    <div className="flex gap-4 pt-1">
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            </div>
        </div>
    );
}
