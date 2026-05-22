import type { MaterialType } from "@/mock";

export type LessonWord = {
  word: string;
  ipa: string;
  vietnameseMeaning: string;
  englishDefinition: string;
  example: string;
  collocations: string[];
  synonyms: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export type LessonBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string; cite?: string }
  | { kind: "callout"; tone: "info" | "tip" | "warning"; title: string; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean };

export type LessonSection = {
  id: string;
  index: number;
  title: string;
  blocks: LessonBlock[];
};

export type LessonGrammarNote = {
  id: string;
  title: string;
  pattern: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  source: MaterialType;
  sourceLabel: string;
  difficulty: "A2" | "B1" | "B2" | "C1";
  estimatedMinutes: number;
  totalWords: number;
  summary: string;
  keyVocabulary: LessonWord[];
  vocabulary: Record<string, LessonWord>; // map word -> info
  sections: LessonSection[];
  grammarNotes: LessonGrammarNote[];
};

const W = (
  word: string,
  ipa: string,
  vn: string,
  en: string,
  ex: string,
  coll: string[],
  syn: string[],
  d: LessonWord["difficulty"],
): LessonWord => ({
  word,
  ipa,
  vietnameseMeaning: vn,
  englishDefinition: en,
  example: ex,
  collocations: coll,
  synonyms: syn,
  difficulty: d,
});

const lesson1Vocab: LessonWord[] = [
  W("habit", "/ˈhæb.ɪt/", "thói quen", "a settled or regular tendency", "Reading every night became a habit.", ["form a habit", "break a habit"], ["routine", "custom"], 2),
  W("cue", "/kjuː/", "tín hiệu, gợi ý", "a signal that triggers a behavior", "The alarm is a cue to start working.", ["visual cue", "social cue"], ["signal", "trigger"], 3),
  W("craving", "/ˈkreɪ.vɪŋ/", "sự thèm muốn mãnh liệt", "a powerful desire for something", "She felt a strong craving for sugar.", ["craving for"], ["urge", "desire"], 4),
  W("reward", "/rɪˈwɔːd/", "phần thưởng", "a thing given in recognition", "Small rewards reinforce good habits.", ["reward system"], ["prize", "bonus"], 2),
  W("trigger", "/ˈtrɪɡ.ər/", "kích hoạt, châm ngòi", "cause an event to happen", "Stress can trigger old habits.", ["trigger a response"], ["spark", "provoke"], 3),
  W("identity", "/aɪˈden.tə.ti/", "bản sắc", "the qualities that make someone who they are", "Habits shape your identity.", ["sense of identity"], ["self", "persona"], 4),
  W("compound", "/ˈkɒm.paʊnd/", "tích lũy, cộng dồn", "increase in value by adding small amounts", "Small habits compound over time.", ["compound interest"], ["accumulate"], 4),
  W("deliberate", "/dɪˈlɪb.ər.ət/", "có chủ đích", "done consciously and intentionally", "Make a deliberate choice to focus.", ["deliberate practice"], ["intentional"], 4),
];

export const mockLessons: Lesson[] = [
  {
    id: "m1",
    title: "The Power of Habit — Chapter 1",
    source: "pdf",
    sourceLabel: "PDF",
    difficulty: "B2",
    estimatedMinutes: 12,
    totalWords: 4820,
    summary:
      "Chương đầu giới thiệu vòng lặp thói quen gồm 3 phần: tín hiệu (cue), hành vi (routine) và phần thưởng (reward). Tác giả cho thấy cách thói quen định hình bản sắc và cách thay đổi chúng một cách có chủ đích.",
    keyVocabulary: lesson1Vocab,
    vocabulary: Object.fromEntries(lesson1Vocab.map((w) => [w.word.toLowerCase(), w])),
    sections: [
      {
        id: "s1",
        index: 1,
        title: "Vòng lặp thói quen",
        blocks: [
          { kind: "paragraph", text: "Every {{habit}} starts with a {{cue}} — a small signal that tells your brain to begin a routine. The behavior follows, and finally comes a {{reward}} that teaches the brain this loop is worth remembering next time." },
          { kind: "paragraph", text: "Over weeks and months, this loop becomes automatic. What was once a {{deliberate}} choice turns into something you barely notice. The brain stops fully participating in decision-making and conserves effort for harder problems." },
          { kind: "callout", tone: "tip", title: "Mẹo học", text: "Hãy quan sát cue – routine – reward của một thói quen bạn muốn thay đổi trước khi cố gắng phá vỡ nó." },
        ],
      },
      {
        id: "s2",
        index: 2,
        title: "Sức mạnh của sự tích lũy",
        blocks: [
          { kind: "paragraph", text: "Tiny improvements may feel invisible at first, yet they {{compound}} into remarkable results. A 1% gain each day becomes nearly 38 times better in a year." },
          { kind: "quote", text: "You do not rise to the level of your goals. You fall to the level of your systems.", cite: "James Clear" },
          { kind: "list", ordered: true, items: [
            "Bắt đầu nhỏ — chọn một hành vi mất dưới 2 phút.",
            "Gắn vào một cue có sẵn (ví dụ: sau khi uống cà phê sáng).",
            "Tự thưởng ngay sau khi hoàn thành để củng cố vòng lặp.",
          ] },
        ],
      },
      {
        id: "s3",
        index: 3,
        title: "Thói quen và bản sắc",
        blocks: [
          { kind: "paragraph", text: "Real change happens when habits become part of your {{identity}}. Instead of saying \"I want to read more\", you say \"I am a reader\". Each page you finish is a vote for that identity." },
          { kind: "paragraph", text: "Stressful moments often {{trigger}} old patterns and bring back unwanted {{craving}}s. Awareness of these triggers is the first defense." },
          { kind: "callout", tone: "info", title: "Ghi nhớ", text: "Mỗi hành động nhỏ là một lá phiếu cho con người bạn muốn trở thành." },
        ],
      },
    ],
    grammarNotes: [
      { id: "g1", title: "Câu điều kiện loại 1", pattern: "If + S + V(s/es), S + will + V", explanation: "Dùng cho hành động có thể xảy ra trong tương lai." },
      { id: "g2", title: "Present Perfect", pattern: "S + have/has + V3", explanation: "Diễn tả hành động bắt đầu trong quá khứ và còn liên quan đến hiện tại." },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return mockLessons.find((l) => l.id === id) ?? mockLessons[0];
}