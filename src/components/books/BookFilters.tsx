import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookCategories, bookLevels } from "@/mock/books";
import { cn } from "@/lib/utils";

export type SortKey = "newest" | "popular" | "ruby-asc" | "level-asc";

type Props = {
  query: string;
  setQuery: (v: string) => void;
  filter: string;
  setFilter: (v: string) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
};

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Mới nhất" },
  { value: "popular", label: "Đọc nhiều" },
  { value: "ruby-asc", label: "Giá Ruby thấp" },
  { value: "level-asc", label: "Độ khó tăng dần" },
];

export function BookFilters({ query, setQuery, filter, setFilter, sort, setSort }: Props) {
  const chips = ["Tất cả", "Miễn phí", "Premium", ...bookLevels, ...bookCategories];
  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm sách, tác giả, chủ đề..."
            className="w-full pl-9"
            aria-label="Tìm kiếm sách"
          />
        </div>
        <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
          <SelectTrigger className="w-full sm:w-[200px]" aria-label="Sắp xếp">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {chips.map((chip) => (
          <button
            key={chip}
            onClick={() => setFilter(chip)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === chip
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground/70 hover:bg-accent",
            )}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}