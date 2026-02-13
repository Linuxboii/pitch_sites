"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    { name: "Mon", leads: 400, conversion: 240 },
    { name: "Tue", leads: 300, conversion: 139 },
    { name: "Wed", leads: 200, conversion: 980 },
    { name: "Thu", leads: 278, conversion: 390 },
    { name: "Fri", leads: 189, conversion: 480 },
    { name: "Sat", leads: 239, conversion: 380 },
    { name: "Sun", leads: 349, conversion: 430 },
];

export function LeadVelocityWidget() {
    return (
        <Card className="glass-panel border-white/10 h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Lead Conversion Velocity</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(11, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#aaa' }}
                        />
                        <Area type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                        <Area type="monotone" dataKey="conversion" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorConv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
