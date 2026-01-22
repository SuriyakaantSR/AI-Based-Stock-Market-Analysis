import { Link } from "wouter";
import logo from "@assets/generated_images/finsight_ai_minimalist_geometric_logo.png";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { STOCKS } from "@/lib/mockData";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function Navbar({ onSearch }: { onSearch: (symbol: string) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-lg overflow-hidden bg-primary/10 p-1 group-hover:bg-primary/20 transition-colors">
            <img src={logo} alt="FinSight AI" className="w-full h-full object-contain" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">FinSight AI</span>
        </Link>

        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <button 
            onClick={() => setOpen(true)}
            className="w-full relative group"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="w-full h-10 rounded-md border border-input bg-muted/50 px-10 py-2 text-sm text-muted-foreground text-left hover:bg-muted/80 hover:text-foreground transition-colors flex items-center justify-between">
              <span>Search Indian Stocks (e.g. RELIANCE)...</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Market
          </button>
          <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            News
          </button>
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
            JS
          </div>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search stock symbol..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {STOCKS.map((stock) => (
              <CommandItem
                key={stock.value}
                onSelect={() => {
                  onSearch(stock.value);
                  setOpen(false);
                }}
              >
                <span className="font-mono font-bold w-24">{stock.value}</span>
                <span className="text-muted-foreground">{stock.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
}