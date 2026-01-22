import { Fundamentals } from "@/lib/mockData";
import { Card, CardContent } from "@/components/ui/card";

interface MetricProps {
  label: string;
  value: string | number;
  sub?: string;
}

function MetricCard({ label, value, sub }: MetricProps) {
  return (
    <Card className="border-none shadow-none bg-muted/30">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
        <p className="text-lg font-mono font-semibold text-foreground">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export function FundamentalsGrid({ data }: { data: Fundamentals }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard label="Market Cap" value={data.marketCap} />
      <MetricCard label="P/E Ratio" value={data.peRatio} />
      <MetricCard label="EPS" value={`₹${data.eps}`} />
      <MetricCard label="Div Yield" value={data.dividendYield} />
      <MetricCard label="52W High" value={`₹${data.high52}`} />
      <MetricCard label="52W Low" value={`₹${data.low52}`} />
      <MetricCard label="Revenue" value={data.revenue} />
      <MetricCard label="Beta" value="1.12" sub="High Volatility" />
    </div>
  );
}