"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
    return (
        <header className="h-16 border-b border-white/5 bg-background/50 backdrop-blur-xl fixed top-0 right-0 left-64 z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4 w-96">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search intelligence..."
                        className="w-full h-9 pl-9 pr-4 rounded-full bg-white/5 border border-white/5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-background" />
                </Button>
                <div className="h-4 w-[1px] bg-white/10" />
                <div className="flex items-center gap-3 pl-2">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-muted-foreground">Premium Plan</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-[1px]">
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
