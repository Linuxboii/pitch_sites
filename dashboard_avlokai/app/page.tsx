"use client";

import { useEffect, useState } from "react";
import { KPICard } from "@/components/ui/KPICard";
import { KPICardSkeleton } from "@/components/ui/Skeleton";
import { SystemHealthChart } from "@/components/dashboard/SystemHealthChart";
import { RecentActivityTable } from "@/components/dashboard/RecentActivityTable";
import { Activity, Database, Server, Smartphone, Zap, Loader2 } from "lucide-react";
import { getWorkflows, getN8nStatus } from "@/app/actions/n8n";
import { cn } from "@/lib/utils";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalWorkflows: 0,
    n8nConnected: false,
    loading: true
  });

  const kpiVisible = useStaggeredEntry(4, 70, 100);
  const sectionVisible = useStaggeredEntry(3, 100, 400);

  useEffect(() => {
    async function fetchData() {
      try {
        const [workflows, status] = await Promise.all([
          getWorkflows(),
          getN8nStatus()
        ]);

        setStats({
          totalWorkflows: workflows.length,
          n8nConnected: status.connected,
          loading: false
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
        setStats(s => ({ ...s, loading: false }));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div
        style={{
          opacity: kpiVisible[0] ? 1 : 0,
          transform: kpiVisible[0] ? "translateY(0)" : "translateY(3px)",
          transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>
          Dashboard
        </h1>
        <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>
          System overview and real-time metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.loading ? (
          <>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  opacity: kpiVisible[i] ? 1 : 0,
                  transform: kpiVisible[i] ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <KPICardSkeleton />
              </div>
            ))}
          </>
        ) : (
          <>
            {[
              { label: "Total Automations", value: stats.totalWorkflows.toString(), subtext: "Active workflows", trend: "neutral" as const, icon: Zap },
              { label: "Runs Today", value: "–", subtext: "Data unavailable", trend: "neutral" as const, icon: Activity },
              { label: "Leads Captured", value: "–", subtext: "Data unavailable", trend: "neutral" as const, icon: Smartphone },
              {
                label: "System Status",
                value: stats.n8nConnected ? "Online" : "Offline",
                subtext: stats.n8nConnected ? "Connected to n8n" : "Check credentials",
                trend: (stats.n8nConnected ? "up" : "down") as "up" | "down",
                icon: Server,
                className: !stats.n8nConnected ? "!border-[#EF4444]/20" : "",
              },
            ].map((card, i) => (
              <div
                key={card.label}
                style={{
                  opacity: kpiVisible[i] ? 1 : 0,
                  transform: kpiVisible[i] ? "translateY(0)" : "translateY(4px)",
                  transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <KPICard {...card} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Row 2: System Health & Status */}
      <div
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        style={{
          opacity: sectionVisible[0] ? 1 : 0,
          transform: sectionVisible[0] ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="lg:col-span-2">
          <SystemHealthChart />
        </div>

        {/* System Status List */}
        <div
          className="rounded-xl p-6 cursor-card"
          style={{
            backgroundColor: "#111827",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h3 className="mb-5 text-[15px] font-medium" style={{ color: "#E5E7EB" }}>System Status</h3>
          <div className="space-y-4">
            {/* PostgreSQL */}
            <div
              className="flex items-center justify-between pb-4 group"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", transition: "background-color 180ms" }}>
                  <Database className="h-4 w-4" style={{ color: "#22C55E" }} strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium" style={{ color: "#E2E8F0" }}>PostgreSQL</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E", boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)" }} />
                <span className="text-[11px] font-medium" style={{ color: "#22C55E" }}>Connected</span>
              </div>
            </div>

            {/* n8n Engine */}
            <div
              className="flex items-center justify-between pb-4 group"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: stats.n8nConnected ? "rgba(34, 197, 94, 0.08)" : "rgba(239, 68, 68, 0.08)", transition: "background-color 180ms" }}>
                  <Zap className="h-4 w-4" style={{ color: stats.loading ? "#475569" : (stats.n8nConnected ? "#22C55E" : "#EF4444"), transition: "color 180ms" }} strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium" style={{ color: "#E2E8F0" }}>n8n Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("h-1.5 w-1.5 rounded-full")}
                  style={{
                    backgroundColor: stats.loading ? "#475569" : (stats.n8nConnected ? "#22C55E" : "#EF4444"),
                    boxShadow: stats.loading ? "none" : (stats.n8nConnected ? "0 0 6px rgba(34, 197, 94, 0.5)" : "0 0 6px rgba(239, 68, 68, 0.5)"),
                    transition: "all 180ms",
                  }}
                />
                <span className="text-[11px] font-medium" style={{
                  color: stats.loading ? "#475569" : (stats.n8nConnected ? "#22C55E" : "#EF4444"),
                  transition: "color 180ms",
                }}>
                  {stats.loading ? "Checking..." : (stats.n8nConnected ? "Running" : "Disconnected")}
                </span>
              </div>
            </div>

            {/* Email Service */}
            <div
              className="flex items-center justify-between pb-4 group"
              style={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", transition: "background-color 180ms" }}>
                  <Server className="h-4 w-4" style={{ color: "#22C55E" }} strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium" style={{ color: "#E2E8F0" }}>Email Service</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E", boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)" }} />
                <span className="text-[11px] font-medium" style={{ color: "#22C55E" }}>Healthy</span>
              </div>
            </div>

            {/* Webhooks */}
            <div
              className="flex items-center justify-between group"
              style={{
                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(245, 158, 11, 0.08)", transition: "background-color 180ms" }}>
                  <Activity className="h-4 w-4" style={{ color: "#F59E0B" }} strokeWidth={1.5} />
                </div>
                <span className="text-[13px] font-medium" style={{ color: "#E2E8F0" }}>Webhooks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F59E0B", boxShadow: "0 0 6px rgba(245, 158, 11, 0.5)" }} />
                <span className="text-[11px] font-medium" style={{ color: "#F59E0B" }}>Degraded</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Activity */}
      <div
        style={{
          opacity: sectionVisible[1] ? 1 : 0,
          transform: sectionVisible[1] ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <RecentActivityTable />
      </div>
    </div>
  );
}
