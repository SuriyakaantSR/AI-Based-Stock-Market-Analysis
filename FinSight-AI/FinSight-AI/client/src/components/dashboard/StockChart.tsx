import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HistoricalPoint } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StockChartProps {
  data: HistoricalPoint[];
  symbol: string;
}

const TIMEFRAMES = ["1D", "1M", "3M", "6M", "1Y", "5Y"];

export function StockChart({ data, symbol }: StockChartProps) {
  const [timeframe, setTimeframe] = useState("1Y");

  // Filter data based on timeframe (mock logic)
  const filteredData = data.slice(
    timeframe === "1M" ? -30 :
    timeframe === "3M" ? -90 :
    timeframe === "6M" ? -180 :
    timeframe === "1Y" ? -365 :
    0
  );

  const isPositive = filteredData[filteredData.length - 1]?.price >= filteredData[0]?.price;

  return (
    <Card className="col-span-3 border-none shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0 pb-4 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Price Performance
          </CardTitle>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-lg">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-all",
                timeframe === tf
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-0 h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-3))"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-3))"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              minTickGap={30}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              }}
            />
            <YAxis
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              orientation="right"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-popover p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Date
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {new Date(label).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Price
                          </span>
                          <span className="font-mono font-bold">
                            ₹{Number(payload[0].value).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={isPositive ? "hsl(var(--chart-2))" : "hsl(var(--chart-3))"}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}