import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";

export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/15 text-teal">
        <Sparkles className="h-7 w-7" />
      </div>
      <h1 className="font-display text-3xl font-semibold">{title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        {description ?? "Tính năng này đang được hoàn thiện. Quay lại sau nhé!"}
      </p>
      <Link to="/" className="btn-press mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium">
        <ArrowLeft className="h-4 w-4" /> Về trang chủ
      </Link>
    </div>
  );
}
