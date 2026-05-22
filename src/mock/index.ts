export type Role = "user" | "admin" | "superadmin";

export const mockUser = {
  id: "u1",
  name: "Nguyễn Minh",
  email: "minh@gmail.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=minh",
  role: "user" as Role,
  level: "B2",
  xp: 2840,
  rubyBalance: 110,
  streakCurrent: 7,
  streakLongest: 23,
  onboardingDone: true,
  goal: "Công việc",
  unlockedFeatures: ["ai_flashcard"],
};

export type VocabStatus = "new" | "learning" | "review" | "mastered";
export type VocabItem = {
  id: string;
  word: string;
  ipa: string;
  vietnameseMeaning: string;
  englishDefinition: string;
  exampleSentence: string;
  collocations: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  status: VocabStatus;
  nextReviewDate: string;
  easeFactor: number;
  reviewCount: number;
};

const today = new Date();
const offset = (d: number) => new Date(today.getTime() + d * 86400000).toISOString();

export const mockVocabulary: VocabItem[] = [
  { id: "v1", word: "eloquent", ipa: "/ˈel.ə.kwənt/", vietnameseMeaning: "hùng biện, lưu loát", englishDefinition: "fluent or persuasive in speaking or writing", exampleSentence: "She gave an eloquent speech at the conference.", collocations: ["eloquent speaker", "eloquent speech"], difficulty: 4, status: "review", nextReviewDate: offset(0), easeFactor: 2.3, reviewCount: 5 },
  { id: "v2", word: "persevere", ipa: "/ˌpɜː.sɪˈvɪər/", vietnameseMeaning: "kiên trì, bền chí", englishDefinition: "continue in a course of action even in the face of difficulty", exampleSentence: "He persevered despite many setbacks.", collocations: ["persevere through", "persevere in"], difficulty: 3, status: "learning", nextReviewDate: offset(0), easeFactor: 2.1, reviewCount: 3 },
  { id: "v3", word: "meticulous", ipa: "/məˈtɪk.jə.ləs/", vietnameseMeaning: "tỉ mỉ, cẩn thận", englishDefinition: "showing great attention to detail; very careful and precise", exampleSentence: "She is meticulous in her research.", collocations: ["meticulous attention", "meticulous planning"], difficulty: 4, status: "review", nextReviewDate: offset(0), easeFactor: 2.4, reviewCount: 6 },
  { id: "v4", word: "unprecedented", ipa: "/ʌnˈpres.ɪ.den.tɪd/", vietnameseMeaning: "chưa từng có", englishDefinition: "never done or known before", exampleSentence: "The pandemic caused unprecedented changes.", collocations: ["unprecedented growth", "unprecedented scale"], difficulty: 5, status: "new", nextReviewDate: offset(1), easeFactor: 2.5, reviewCount: 0 },
  { id: "v5", word: "tenacious", ipa: "/təˈneɪ.ʃəs/", vietnameseMeaning: "kiên cường, ngoan cường", englishDefinition: "tending to keep a firm hold of something", exampleSentence: "A tenacious athlete never gives up.", collocations: ["tenacious grip", "tenacious effort"], difficulty: 4, status: "mastered", nextReviewDate: offset(14), easeFactor: 2.8, reviewCount: 9 },
  { id: "v6", word: "resilient", ipa: "/rɪˈzɪl.i.ənt/", vietnameseMeaning: "có sức bật, kiên cường", englishDefinition: "able to recover quickly from difficulties", exampleSentence: "Children are remarkably resilient.", collocations: ["resilient economy", "resilient system"], difficulty: 3, status: "mastered", nextReviewDate: offset(21), easeFactor: 2.9, reviewCount: 11 },
  { id: "v7", word: "ambiguous", ipa: "/æmˈbɪɡ.ju.əs/", vietnameseMeaning: "mơ hồ, không rõ ràng", englishDefinition: "open to more than one interpretation", exampleSentence: "His answer was deliberately ambiguous.", collocations: ["ambiguous wording", "ambiguous meaning"], difficulty: 3, status: "learning", nextReviewDate: offset(0), easeFactor: 2.0, reviewCount: 2 },
  { id: "v8", word: "catalyst", ipa: "/ˈkæt.əl.ɪst/", vietnameseMeaning: "chất xúc tác, nhân tố thúc đẩy", englishDefinition: "a person or thing that precipitates an event", exampleSentence: "She was the catalyst for change.", collocations: ["catalyst for change"], difficulty: 4, status: "review", nextReviewDate: offset(0), easeFactor: 2.3, reviewCount: 4 },
  { id: "v9", word: "endeavor", ipa: "/ɪnˈdev.ər/", vietnameseMeaning: "nỗ lực, cố gắng", englishDefinition: "try hard to do or achieve something", exampleSentence: "We endeavor to provide excellent service.", collocations: ["endeavor to", "human endeavor"], difficulty: 3, status: "new", nextReviewDate: offset(1), easeFactor: 2.5, reviewCount: 0 },
  { id: "v10", word: "paradigm", ipa: "/ˈpær.ə.daɪm/", vietnameseMeaning: "khuôn mẫu, mô hình", englishDefinition: "a typical example or pattern of something", exampleSentence: "A new paradigm of learning emerged.", collocations: ["paradigm shift"], difficulty: 5, status: "review", nextReviewDate: offset(0), easeFactor: 2.2, reviewCount: 4 },
  { id: "v11", word: "scrutinize", ipa: "/ˈskruː.tɪ.naɪz/", vietnameseMeaning: "xem xét kỹ lưỡng", englishDefinition: "examine or inspect closely and thoroughly", exampleSentence: "Auditors scrutinize the accounts every year.", collocations: ["scrutinize carefully"], difficulty: 4, status: "learning", nextReviewDate: offset(0), easeFactor: 2.1, reviewCount: 2 },
  { id: "v12", word: "pragmatic", ipa: "/præɡˈmæt.ɪk/", vietnameseMeaning: "thực dụng, thực tế", englishDefinition: "dealing with things sensibly and realistically", exampleSentence: "We need a pragmatic approach.", collocations: ["pragmatic approach", "pragmatic solution"], difficulty: 3, status: "review", nextReviewDate: offset(0), easeFactor: 2.4, reviewCount: 5 },
  { id: "v13", word: "compelling", ipa: "/kəmˈpel.ɪŋ/", vietnameseMeaning: "hấp dẫn, thuyết phục", englishDefinition: "evoking interest, attention, or admiration", exampleSentence: "She made a compelling argument.", collocations: ["compelling argument", "compelling story"], difficulty: 3, status: "mastered", nextReviewDate: offset(10), easeFactor: 2.7, reviewCount: 8 },
  { id: "v14", word: "nuance", ipa: "/ˈnjuː.ɑːns/", vietnameseMeaning: "sắc thái tinh tế", englishDefinition: "a subtle difference in meaning or expression", exampleSentence: "He missed the nuance of her remark.", collocations: ["subtle nuance", "every nuance"], difficulty: 4, status: "new", nextReviewDate: offset(1), easeFactor: 2.5, reviewCount: 0 },
  { id: "v15", word: "articulate", ipa: "/ɑːˈtɪk.jə.lət/", vietnameseMeaning: "diễn đạt rõ ràng", englishDefinition: "able to express thoughts clearly and effectively", exampleSentence: "She is articulate and confident.", collocations: ["articulate speaker"], difficulty: 4, status: "learning", nextReviewDate: offset(0), easeFactor: 2.2, reviewCount: 3 },
  { id: "v16", word: "immerse", ipa: "/ɪˈmɜːs/", vietnameseMeaning: "đắm chìm, hòa mình", englishDefinition: "involve oneself deeply in an activity", exampleSentence: "Immerse yourself in the language.", collocations: ["immerse oneself in"], difficulty: 3, status: "review", nextReviewDate: offset(0), easeFactor: 2.3, reviewCount: 4 },
  { id: "v17", word: "dedicate", ipa: "/ˈded.ɪ.keɪt/", vietnameseMeaning: "cống hiến, dành riêng", englishDefinition: "devote time or effort to a task or purpose", exampleSentence: "He dedicates his weekends to volunteering.", collocations: ["dedicate time to"], difficulty: 2, status: "mastered", nextReviewDate: offset(30), easeFactor: 2.9, reviewCount: 12 },
  { id: "v18", word: "flourish", ipa: "/ˈflʌr.ɪʃ/", vietnameseMeaning: "phát triển mạnh mẽ", englishDefinition: "grow or develop in a healthy or vigorous way", exampleSentence: "The business flourished after the launch.", collocations: ["flourish in", "let flourish"], difficulty: 3, status: "review", nextReviewDate: offset(0), easeFactor: 2.4, reviewCount: 5 },
  { id: "v19", word: "refine", ipa: "/rɪˈfaɪn/", vietnameseMeaning: "tinh chỉnh, làm tinh tế", englishDefinition: "improve something by making small changes", exampleSentence: "We need to refine our strategy.", collocations: ["refine skills", "refine technique"], difficulty: 3, status: "learning", nextReviewDate: offset(0), easeFactor: 2.1, reviewCount: 2 },
  { id: "v20", word: "acquire", ipa: "/əˈkwaɪər/", vietnameseMeaning: "đạt được, tiếp thu", englishDefinition: "buy or obtain something for oneself", exampleSentence: "Children acquire language naturally.", collocations: ["acquire knowledge", "acquire skills"], difficulty: 2, status: "mastered", nextReviewDate: offset(45), easeFactor: 3.0, reviewCount: 15 },
];

export type MaterialType = "pdf" | "youtube" | "paste" | "article";
export type MaterialStatus = "uploading" | "processing" | "ready" | "failed";
export type ProcessingStage =
  | "uploading"
  | "extracting"
  | "analyzing"
  | "generating"
  | "ready"
  | "failed";
export type Material = {
  id: string;
  title: string;
  type: MaterialType;
  status: MaterialStatus;
  wordCount?: number;
  createdAt: string;
  errorMessage?: string;
  stage?: ProcessingStage;
  progress?: number;
  generatedFlashcards?: number;
  sourceMeta?: string;
  fileSize?: number;
};

export const mockMaterials: Material[] = [
  { id: "m1", title: "The Power of Habit — Chapter 1", type: "pdf", status: "ready", wordCount: 4820, createdAt: offset(-1) },
  { id: "m2", title: "TED Talk: The Power of Vulnerability", type: "youtube", status: "ready", wordCount: 3210, createdAt: offset(-2) },
  { id: "m3", title: "Atomic Habits — Summary", type: "paste", status: "ready", wordCount: 1240, createdAt: offset(0) },
  { id: "m4", title: "BBC: Climate change explained", type: "article", status: "ready", wordCount: 2150, createdAt: offset(-3) },
  { id: "m5", title: "Cambridge IELTS Reading 17 — Test 1", type: "pdf", status: "processing", createdAt: offset(0) },
  { id: "m6", title: "Steve Jobs Stanford Commencement", type: "youtube", status: "processing", createdAt: offset(0) },
  { id: "m7", title: "My pasted essay draft", type: "paste", status: "uploading", createdAt: offset(0) },
  { id: "m8", title: "Unsupported broken article", type: "article", status: "failed", createdAt: offset(-1), errorMessage: "Không thể đọc nội dung." },
];

export type VocabPack = {
  id: string;
  title: string;
  coverGradient: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  wordCount: number;
  isPremium: boolean;
  rubyPrice: number;
  totalPurchases: number;
  visibility: "public" | "private";
  tags: string[];
  creator: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
};

export const mockVocabPacks: VocabPack[] = [
  { id: "p1", title: "IELTS Academic Essentials", coverGradient: "from-teal/80 to-indigo/80", level: "B2", wordCount: 320, isPremium: true, rubyPrice: 150, totalPurchases: 1842, visibility: "public", tags: ["IELTS", "Academic"], creator: "EnglishUp", difficulty: 4 },
  { id: "p2", title: "TOEIC 600+ Vocabulary", coverGradient: "from-indigo/80 to-coral/70", level: "B1", wordCount: 250, isPremium: true, rubyPrice: 150, totalPurchases: 1320, visibility: "public", tags: ["TOEIC"], creator: "EnglishUp", difficulty: 3 },
  { id: "p3", title: "Giao tiếp hằng ngày", coverGradient: "from-amber/80 to-coral/80", level: "A2", wordCount: 180, isPremium: false, rubyPrice: 0, totalPurchases: 4500, visibility: "public", tags: ["Giao tiếp"], creator: "Minh", difficulty: 2 },
  { id: "p4", title: "THPT Quốc Gia — Từ vựng cốt lõi", coverGradient: "from-teal/80 to-amber/70", level: "B1", wordCount: 400, isPremium: false, rubyPrice: 0, totalPurchases: 2870, visibility: "public", tags: ["THPT"], creator: "Linh", difficulty: 3 },
  { id: "p5", title: "Business English for Professionals", coverGradient: "from-indigo/80 to-teal/70", level: "C1", wordCount: 280, isPremium: true, rubyPrice: 150, totalPurchases: 980, visibility: "public", tags: ["Người đi làm"], creator: "EnglishUp", difficulty: 5 },
  { id: "p6", title: "Phrasal Verbs Mastery", coverGradient: "from-coral/80 to-amber/70", level: "B2", wordCount: 220, isPremium: false, rubyPrice: 0, totalPurchases: 3400, visibility: "public", tags: ["Giao tiếp"], creator: "Hùng", difficulty: 4 },
];

export type Book = {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
  level: string;
  totalPages: number;
  isPremium: boolean;
  rubyPrice: number;
  status: "published";
};

export const mockBooks: Book[] = [
  { id: "b1", title: "The Little Prince", author: "Antoine de Saint-Exupéry", coverGradient: "from-amber to-coral", level: "A2", totalPages: 96, isPremium: false, rubyPrice: 0, status: "published" },
  { id: "b2", title: "Animal Farm", author: "George Orwell", coverGradient: "from-teal to-indigo", level: "B1", totalPages: 112, isPremium: false, rubyPrice: 0, status: "published" },
  { id: "b3", title: "The Great Gatsby", author: "F. Scott Fitzgerald", coverGradient: "from-indigo to-coral", level: "B2", totalPages: 180, isPremium: true, rubyPrice: 100, status: "published" },
  { id: "b4", title: "Sapiens (Adapted)", author: "Yuval Noah Harari", coverGradient: "from-coral to-amber", level: "C1", totalPages: 240, isPremium: true, rubyPrice: 100, status: "published" },
];

export type BookPage = {
  pageNumber: number;
  content: string;
  hasImage?: boolean;
};

export const mockBookPages: Record<string, BookPage[]> = {
  b1: Array.from({ length: 96 }, (_, i) => ({
    pageNumber: i + 1,
    content: i === 0
      ? "Once when I was six years old I saw a magnificent picture in a book, called True Stories from Nature, about the primeval forest. It was a picture of a boa constrictor in the act of swallowing an animal."
      : i === 1
        ? "In the book it said: \"Boa constrictors swallow their prey whole, without chewing it. After that they are not able to move, and they sleep through the six months that they need for digestion.\""
        : `Page ${i + 1}: The Little Prince continued his journey across the universe, meeting strange characters and learning important lessons about friendship, love, and responsibility.`,
    hasImage: i % 10 === 0,
  })),
  b2: Array.from({ length: 112 }, (_, i) => ({
    pageNumber: i + 1,
    content: i === 0
      ? "Mr. Jones, of the Manor Farm, had locked the hen-houses for the night, but was too drunk to remember to shut the pop-holes."
      : `Page ${i + 1}: The animals on the farm continued their revolution. The Seven Commandments were written on the barn wall...`,
    hasImage: i % 12 === 0,
  })),
  b3: Array.from({ length: 180 }, (_, i) => ({
    pageNumber: i + 1,
    content: i === 0
      ? "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since."
      : `Page ${i + 1}: Gatsby looked across the bay toward the green light at the end of Daisy's dock. He believed the future would bring something wonderful...`,
    hasImage: i % 15 === 0,
  })),
  b4: Array.from({ length: 240 }, (_, i) => ({
    pageNumber: i + 1,
    content: i === 0
      ? "About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang."
      : `Page ${i + 1}: Humans evolved over millions of years to become the dominant species on this planet. But what makes Homo sapiens different?`,
    hasImage: i % 20 === 0,
  })),
};

export const mockProgress = {
  xpEarned: [120, 180, 90, 220, 140, 300, 240, 160, 200, 110, 280, 320, 180, 240],
  wordsReviewed: [12, 18, 8, 22, 14, 30, 24, 16, 20, 11, 28, 32, 18, 24],
  studyMinutes: [15, 22, 10, 28, 18, 35, 30, 20, 25, 14, 32, 38, 22, 28],
};

export const mockRubyPackages = [
  { id: "r1", name: "Gói Nhỏ", priceVnd: 50000, ruby: 500, badge: null as string | null },
  { id: "r2", name: "Gói Vừa", priceVnd: 100000, ruby: 1100, badge: "POPULAR" },
  { id: "r3", name: "Gói Lớn", priceVnd: 200000, ruby: 2500, badge: "BEST VALUE" },
  { id: "r4", name: "Gói VIP", priceVnd: 500000, ruby: 7000, badge: "HOT" },
];

export const mockLeaderboard = [
  { rank: 1, name: "Trần Anh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anh", xp: 8420, streak: 45, level: "C1" },
  { rank: 2, name: "Lê Hương", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=huong", xp: 7180, streak: 32, level: "B2" },
  { rank: 3, name: "Phạm Quân", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=quan", xp: 6540, streak: 28, level: "B2" },
  { rank: 4, name: "Vũ Linh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=linh", xp: 5320, streak: 22, level: "B1" },
  { rank: 5, name: "Nguyễn Minh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=minh", xp: 2840, streak: 7, level: "B2" },
  { rank: 6, name: "Đỗ Trang", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=trang", xp: 2510, streak: 12, level: "B1" },
  { rank: 7, name: "Bùi Khoa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=khoa", xp: 2120, streak: 9, level: "A2" },
  { rank: 8, name: "Hoàng Nam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nam", xp: 1890, streak: 5, level: "A2" },
  { rank: 9, name: "Ngô Hà", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ha", xp: 1640, streak: 14, level: "A2" },
  { rank: 10, name: "Đặng Phú", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=phu", xp: 1320, streak: 3, level: "A1" },
];

export const learningPathFilters = ["Tất cả", "IELTS", "TOEIC", "THPT", "Giao tiếp", "Người đi làm", "Theo level"] as const;
