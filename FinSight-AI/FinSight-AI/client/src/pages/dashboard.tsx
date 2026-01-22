import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchStockData } from "@/lib/mockData";
import { Navbar } from "@/components/layout/Navbar";
import { StockChart } from "@/components/dashboard/StockChart";
import { FundamentalsGrid } from "@/components/dashboard/Fundamentals";
import { AIAnalysisCard } from "@/components/dashboard/AIAnalysis";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [symbol, setSymbol] = useState("RELIANCE");

  const { data, isLoading, error } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => fetchStockData(symbol),
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar onSearch={setSymbol} />

      <main className="container mx-auto px-4 pt-8 space-y-8">
        {isLoading ? (
          <div className="space-y-8 animate-pulse">
             <div className="h-20 w-1/3 bg-muted rounded-lg" />
             <div className="h-[400px] bg-muted rounded-lg" />
             <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-24 bg-muted rounded-lg" />)}
             </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-destructive">Error Loading Stock Data</h2>
            <p className="text-muted-foreground">Please try searching for another stock.</p>
          </div>
        ) : data ? (
          <>
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-heading font-bold tracking-tight">{data.data.name}</h1>
                  <span className="text-sm font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    NSE: {data.data.symbol}
                  </span>
                </div>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-mono font-bold tracking-tighter">
                    ₹{data.data.price.toFixed(2)}
                  </span>
                  <div className={cn(
                    "flex items-center gap-1 text-lg font-medium",
                    data.data.change >= 0 ? "text-emerald-600" : "text-rose-600"
                  )}>
                    {data.data.change >= 0 ? <ArrowUp className="size-5" /> : <ArrowDown className="size-5" />}
                    {Math.abs(data.data.change).toFixed(2)} ({Math.abs(data.data.changePercent).toFixed(2)}%)
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Last updated: {new Date(data.data.lastUpdated).toLocaleString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                  Add to Watchlist
                </button>
                <button className="px-4 py-2 border border-input bg-background hover:bg-muted transition-colors font-medium rounded-lg">
                  Set Alert
                </button>
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              {/* Left Column: Chart & Fundamentals */}
              <div className="lg:col-span-2 space-y-8">
                <section className="glass-panel p-6 rounded-xl">
                  <StockChart data={data.history} symbol={data.data.symbol} />
                </section>
                
                <section className="space-y-4">
                  <h3 className="text-lg font-semibold tracking-tight">Fundamental Metrics</h3>
                  <FundamentalsGrid data={data.fundamentals} />
                </section>
              </div>

              {/* Right Column: Analysis & News */}
              <div className="space-y-8">
                <AIAnalysisCard analysis={data.analysis} />
                
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Market News</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="group cursor-pointer">
                        <p className="text-xs text-muted-foreground mb-1">2 hours ago • Economic Times</p>
                        <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {data.data.symbol} announces new strategic partnership to expand digital footprint across India.
                        </h4>
                        <div className="h-px bg-border mt-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}