'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface CasesPerMonthChartProps {
    data: { month: string; cases: number }[];
}

export function CasesPerMonthChart({ data }: CasesPerMonthChartProps) {
    const chartConfig = {
        cases: {
            label: "Cases",
            color: "hsl(var(--primary))",
        },
    };

    return (
        <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
                <CardTitle>Cases Per Month</CardTitle>
                <CardDescription>Number of cases created over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                            <XAxis 
                                dataKey="month" 
                                tickLine={false} 
                                axisLine={false} 
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                                tickMargin={10}
                            />
                            <YAxis 
                                tickLine={false} 
                                axisLine={false} 
                                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <ChartTooltip cursor={{ fill: 'hsl(var(--muted)/0.5)' }} content={<ChartTooltipContent />} />
                            <Bar dataKey="cases" fill="var(--color-cases)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

interface CaseStatusChartProps {
    data: { name: string; value: number; fill: string }[];
}

export function CaseStatusChart({ data }: CaseStatusChartProps) {
    const chartConfig = {
        Open: { label: 'Open', color: 'hsl(var(--chart-1))' },
        Closed: { label: 'Closed', color: 'hsl(var(--chart-2))' },
        Pending: { label: 'Pending', color: 'hsl(var(--chart-3))' },
    };

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Ratio of open, closed, and pending cases.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
