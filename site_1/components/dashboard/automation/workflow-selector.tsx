"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search, Box } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Workflow } from "@/app/actions/n8n";

interface WorkflowSelectorProps {
    workflows: Workflow[];
    selectedId: string;
    onSelect: (id: string) => void;
    disabled?: boolean;
}

export function WorkflowSelector({
    workflows,
    selectedId,
    onSelect,
    disabled
}: WorkflowSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedWorkflow = workflows.find((w) => w.id === selectedId);

    // Close on click outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredWorkflows = workflows.filter((w) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative" ref={containerRef}>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                onClick={() => !disabled && setOpen(!open)}
                disabled={disabled}
            >
                <div className="flex items-center gap-2 truncate">
                    <Box className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{selectedWorkflow?.name || "Select workflow..."}</span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-[300px] z-50 rounded-md border border-white/10 bg-[#0B0F19]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center border-b border-white/10 px-3 py-2">
                            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                            <input
                                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground text-white disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Search workflows..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div className="max-h-[300px] overflow-y-auto p-1 custom-scrollbar">
                            {filteredWorkflows.length === 0 ? (
                                <div className="py-6 text-center text-sm text-muted-foreground">
                                    No workflows found.
                                </div>
                            ) : (
                                filteredWorkflows.map((workflow) => (
                                    <div
                                        key={workflow.id}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                            workflow.id === selectedId
                                                ? "bg-primary/20 text-white"
                                                : "text-muted-foreground hover:bg-white/10 hover:text-white"
                                        )}
                                        onClick={() => {
                                            onSelect(workflow.id);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedId === workflow.id ? "opacity-100 text-primary" : "opacity-0"
                                            )}
                                        />
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-medium truncate">{workflow.name}</span>
                                            <span className="text-[10px] text-muted-foreground opacity-70">ID: {workflow.id.substring(0, 8)}...</span>
                                        </div>

                                        {workflow.active && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
