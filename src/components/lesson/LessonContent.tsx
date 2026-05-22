import { Fragment } from "react";
import { motion } from "framer-motion";
import { Info, Lightbulb, AlertTriangle, Quote } from "lucide-react";
import type { Lesson, LessonBlock, LessonWord } from "@/mock/lessons";
import { VocabToken } from "./VocabToken";

const tokenRegex = /\{\{([a-zA-Z]+)\}\}/g;

function renderText(
  text: string,
  vocab: Record<string, LessonWord>,
  onOpen: (w: LessonWord) => void,
  onSave: (w: LessonWord) => void,
) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = tokenRegex.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const key = m[1].toLowerCase();
    const info = vocab[key];
    if (info) {
      parts.push(
        <VocabToken
          key={`${key}-${m.index}`}
          word={m[1]}
          info={info}
          onOpen={() => onOpen(info)}
          onSave={() => onSave(info)}
        />,
      );
    } else {
      parts.push(m[1]);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

const calloutStyle = {
  info: { cls: "border-indigo/30 bg-indigo/8 text-indigo", Icon: Info },
  tip: { cls: "border-teal/30 bg-teal/8 text-teal", Icon: Lightbulb },
  warning: { cls: "border-coral/30 bg-coral/8 text-coral", Icon: AlertTriangle },
} as const;

function Block({
  block,
  vocab,
  onOpen,
  onSave,
}: {
  block: LessonBlock;
  vocab: Record<string, LessonWord>;
  onOpen: (w: LessonWord) => void;
  onSave: (w: LessonWord) => void;
}) {
  if (block.kind === "heading") {
    const Tag = (`h${block.level}`) as "h2" | "h3";
    return (
      <Tag className="mt-6 font-display text-xl font-semibold text-foreground sm:text-2xl">
        {block.text}
      </Tag>
    );
  }
  if (block.kind === "paragraph") {
    return (
      <p className="text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8">
        {renderText(block.text, vocab, onOpen, onSave)}
      </p>
    );
  }
  if (block.kind === "quote") {
    return (
      <figure className="my-4 rounded-2xl border-l-4 border-amber bg-amber/8 p-4">
        <Quote className="h-5 w-5 text-amber" />
        <blockquote className="mt-2 font-display text-lg italic text-foreground/90">
          “{block.text}”
        </blockquote>
        {block.cite && (
          <figcaption className="mt-1 text-xs text-muted-foreground">— {block.cite}</figcaption>
        )}
      </figure>
    );
  }
  if (block.kind === "callout") {
    const s = calloutStyle[block.tone];
    return (
      <div className={`my-4 rounded-2xl border p-4 ${s.cls}`}>
        <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <s.Icon className="h-4 w-4" />
          {block.title}
        </div>
        <p className="text-sm text-foreground/90">{block.text}</p>
      </div>
    );
  }
  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag
        className={`my-3 space-y-2 pl-5 text-[15px] leading-7 text-foreground/90 ${
          block.ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {block.items.map((it, i) => (
          <li key={i}>{renderText(it, vocab, onOpen, onSave)}</li>
        ))}
      </Tag>
    );
  }
  return null;
}

export function LessonContent({
  lesson,
  onOpenWord,
  onSaveWord,
}: {
  lesson: Lesson;
  onOpenWord: (w: LessonWord) => void;
  onSaveWord: (w: LessonWord) => void;
}) {
  return (
    <div className="space-y-10">
      {lesson.sections.map((section, idx) => (
        <motion.section
          key={section.id}
          id={`section-${section.id}`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal text-sm font-semibold text-teal-foreground">
              {section.index}
            </span>
            <h2 className="font-display text-xl font-semibold sm:text-2xl">{section.title}</h2>
          </div>
          <div className="space-y-3">
            {section.blocks.map((b, i) => (
              <Block key={i} block={b} vocab={lesson.vocabulary} onOpen={onOpenWord} onSave={onSaveWord} />
            ))}
          </div>
        </motion.section>
      ))}
    </div>
  );
}