import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0B0F19] flex">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Topbar />
                <main className="flex-1 pt-16 p-6 overflow-y-auto min-h-screen relative">
                    {/* Ambient Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/5 blur-[100px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-full h-[500px] bg-secondary/5 blur-[100px] -z-10 pointer-events-none" />
                    {children}
                </main>
            </div>
        </div>
    );
}
