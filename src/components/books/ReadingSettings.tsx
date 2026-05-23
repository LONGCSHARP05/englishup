import { Settings2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useBooksStore, type ReadingSettingsState } from "@/store/useBooksStore";
import { cn } from "@/lib/utils";

type Group = {
  key: keyof ReadingSettingsState;
  label: string;
  options: { value: string; label: string }[];
};

const groups: Group[] = [
  {
    key: "fontSize",
    label: "Cỡ chữ",
    options: [
      { value: "sm", label: "Nhỏ" },
      { value: "md", label: "Vừa" },
      { value: "lg", label: "Lớn" },
    ],
  },
  {
    key: "theme",
    label: "Nền trang",
    options: [
      { value: "light", label: "Sáng" },
      { value: "sepia", label: "Giấy vàng" },
      { value: "dark", label: "Tối" },
    ],
  },
  {
    key: "layout",
    label: "Bố cục",
    options: [
      { value: "single", label: "Một trang" },
      { value: "spread", label: "Hai trang" },
    ],
  },
];

export function ReadingSettings() {
  const settings = useBooksStore((s) => s.settings);
  const setSettings = useBooksStore((s) => s.setSettings);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Cài đặt đọc">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 space-y-4">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="mb-2 text-xs font-medium text-muted-foreground">{g.label}</div>
            <div className="flex gap-1.5">
              {g.options.map((o) => {
                const active = (settings[g.key] as string) === o.value;
                return (
                  <button
                    key={o.value}
                    onClick={() =>
                      setSettings({ [g.key]: o.value } as Partial<ReadingSettingsState>)
                    }
                    className={cn(
                      "flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-accent",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}