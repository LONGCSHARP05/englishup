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

// Listening Module Types
export type DictationSentence = {
  id: string;
  order: number;
  audio_url: string;
  correct_text: string;
  duration: number;
};

export type ListeningMaterial = {
  id: string;
  title: string;
  source_material_id: string;
  type: "dictation" | "shadowing";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  duration_minutes: number;
  topic: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  sentences: DictationSentence[];
  created_at: string;
};

export type ListeningSession = {
  id: string;
  material_id: string;
  started_at: number;
  completed_at?: number;
  overall_accuracy: number;
  total_sentences: number;
  correct_sentences: number;
  status: "in_progress" | "completed";
};

export const mockListeningMaterials: ListeningMaterial[] = [
  {
    id: "l1",
    title: "Daily English Conversation — Ordering Coffee",
    source_material_id: "m1",
    type: "dictation",
    level: "A2",
    duration_minutes: 4,
    topic: "Giao tiếp hàng ngày",
    difficulty: 2,
    sentences: [
      { id: "s1", order: 1, audio_url: "mock://audio/1.mp3", correct_text: "Good morning, I would like a cappuccino please.", duration: 4 },
      { id: "s2", order: 2, audio_url: "mock://audio/2.mp3", correct_text: "Would you like that hot or iced?", duration: 3 },
      { id: "s3", order: 3, audio_url: "mock://audio/3.mp3", correct_text: "I prefer it hot with an extra shot of espresso.", duration: 4 },
      { id: "s4", order: 4, audio_url: "mock://audio/4.mp3", correct_text: "That will be five dollars.", duration: 2 },
      { id: "s5", order: 5, audio_url: "mock://audio/5.mp3", correct_text: "Thank you, have a great day!", duration: 3 },
    ],
    created_at: offset(-2),
  },
  {
    id: "l2",
    title: "IELTS Listening — Section 1",
    source_material_id: "m2",
    type: "dictation",
    level: "B1",
    duration_minutes: 8,
    topic: "IELTS",
    difficulty: 3,
    sentences: [
      { id: "s6", order: 1, audio_url: "mock://audio/6.mp3", correct_text: "The conference begins at nine o'clock.", duration: 3 },
      { id: "s7", order: 2, audio_url: "mock://audio/7.mp3", correct_text: "Registration is in the main hall.", duration: 3 },
      { id: "s8", order: 3, audio_url: "mock://audio/8.mp3", correct_text: "Please bring your identification and booking confirmation.", duration: 4 },
      { id: "s9", order: 4, audio_url: "mock://audio/9.mp3", correct_text: "The keynote speaker will arrive at ten thirty.", duration: 4 },
      { id: "s10", order: 5, audio_url: "mock://audio/10.mp3", correct_text: "Lunch will be served in the cafeteria.", duration: 3 },
      { id: "s11", order: 6, audio_url: "mock://audio/11.mp3", correct_text: "We have arranged transportation to the airport.", duration: 4 },
      { id: "s12", order: 7, audio_url: "mock://audio/12.mp3", correct_text: "The workshop concludes at five o'clock.", duration: 3 },
    ],
    created_at: offset(-5),
  },
  {
    id: "l3",
    title: "TED Talk Shadowing — Technology Trends",
    source_material_id: "m3",
    type: "shadowing",
    level: "B2",
    duration_minutes: 6,
    topic: "Technology",
    difficulty: 4,
    sentences: [
      { id: "s13", order: 1, audio_url: "mock://audio/13.mp3", correct_text: "Artificial intelligence is transforming how we work.", duration: 4 },
      { id: "s14", order: 2, audio_url: "mock://audio/14.mp3", correct_text: "Machine learning algorithms can now process massive amounts of data.", duration: 5 },
      { id: "s15", order: 3, audio_url: "mock://audio/15.mp3", correct_text: "The implications for society are profound and far-reaching.", duration: 4 },
      { id: "s16", order: 4, audio_url: "mock://audio/16.mp3", correct_text: "We must consider both the opportunities and the challenges.", duration: 4 },
    ],
    created_at: offset(-3),
  },
  {
    id: "l4",
    title: "BBC Learning English — Business Phrases",
    source_material_id: "m4",
    type: "dictation",
    level: "B2",
    duration_minutes: 5,
    topic: "Business English",
    difficulty: 3,
    sentences: [
      { id: "s17", order: 1, audio_url: "mock://audio/17.mp3", correct_text: "We need to synergize our efforts to achieve the quarterly targets.", duration: 4 },
      { id: "s18", order: 2, audio_url: "mock://audio/18.mp3", correct_text: "The stakeholders are expecting significant returns on investment.", duration: 4 },
      { id: "s19", order: 3, audio_url: "mock://audio/19.mp3", correct_text: "Let's circle back on this during next week's meeting.", duration: 4 },
      { id: "s20", order: 4, audio_url: "mock://audio/20.mp3", correct_text: "We should leverage our competitive advantage in the market.", duration: 4 },
    ],
    created_at: offset(-1),
  },
];

export const mockListeningSessions: ListeningSession[] = [
  { id: "ls1", material_id: "l1", started_at: Date.now() - 3600000, completed_at: Date.now() - 3540000, overall_accuracy: 85, total_sentences: 5, correct_sentences: 4, status: "completed" },
  { id: "ls2", material_id: "l2", started_at: Date.now() - 86400000, completed_at: Date.now() - 86340000, overall_accuracy: 78, total_sentences: 7, correct_sentences: 5, status: "completed" },
  { id: "ls3", material_id: "l3", started_at: Date.now() - 172800000, completed_at: Date.now() - 172740000, overall_accuracy: 82, total_sentences: 4, correct_sentences: 3, status: "completed" },
];

// Reading Module Types
export type ReadingParagraph = {
  id: string;
  order: number;
  text: string;
  vocabulary_ids: string[];
};

export type ReadingQuestion = {
  id: string;
  type: "multiple_choice" | "true_false" | "fill_blank";
  question: string;
  options?: string[];
  correct_answer: string;
  explanation: string;
};

export type ReadingArticle = {
  id: string;
  title: string;
  thumbnail: string;
  category: "Daily News" | "Technology" | "Business" | "IELTS Reading" | "Stories" | "Science";
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  estimated_minutes: number;
  word_count: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  paragraphs: ReadingParagraph[];
  questions: ReadingQuestion[];
  vocabulary_highlighted: VocabItem[];
  created_at: string;
};

export type ReadingSession = {
  id: string;
  article_id: string;
  started_at: number;
  completed_at?: number;
  reading_time_seconds: number;
  quiz_score?: number;
  quiz_total?: number;
  vocabulary_learned: number;
  status: "in_progress" | "completed";
};

export const mockReadingArticles: ReadingArticle[] = [
  {
    id: "ra1",
    title: "The Rise of Electric Vehicles",
    thumbnail: "https://images.pexels.com/photos/15923865/pexels-photo-15923865.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Technology",
    level: "B1",
    estimated_minutes: 8,
    word_count: 680,
    difficulty: 3,
    vocabulary_highlighted: mockVocabulary.filter(v => ["resilient", "compelling", "acquire", "dedicate", "flourish"].includes(v.word)),
    paragraphs: [
      { id: "p1", order: 1, text: "Electric vehicles have become increasingly popular in recent years. Major automakers are investing billions in EV technology. The shift away from fossil fuels represents a fundamental change in the automotive industry.", vocabulary_ids: ["v6", "v13"] },
      { id: "p2", order: 2, text: "Governments around the world are offering incentives for consumers to switch to electric cars. Tax credits, free parking, and access to carpool lanes make EVs more attractive to potential buyers.", vocabulary_ids: [] },
      { id: "p3", order: 3, text: "However, challenges remain. Battery technology needs to improve to increase range and reduce charging time. Infrastructure for charging stations must expand significantly to support widespread adoption.", vocabulary_ids: [] },
    ],
    questions: [
      { id: "q1", type: "multiple_choice", question: "Why are automakers investing in EV technology?", options: ["To reduce costs", "To shift away from fossil fuels", "To compete with bicycles", "To create more jobs"], correct_answer: "To shift away from fossil fuels", explanation: "Paragraph 1 states that the shift away from fossil fuels represents a fundamental change in the automotive industry." },
      { id: "q2", type: "multiple_choice", question: "What government incentives are mentioned?", options: ["Free vehicles", "Tax credits and free parking", "Housing subsidies", "Education grants"], correct_answer: "Tax credits and free parking", explanation: "Paragraph 2 mentions tax credits, free parking, and access to carpool lanes." },
      { id: "q3", type: "true_false", question: "Electric vehicles have solved all their major challenges.", options: ["True", "False"], correct_answer: "False", explanation: "Paragraph 3 states that challenges remain, particularly with battery technology and charging infrastructure." },
      { id: "q4", type: "fill_blank", question: "Battery technology needs to improve to increase ____.", correct_answer: "range", explanation: "Paragraph 3 mentions increasing range and reducing charging time." },
    ],
    created_at: offset(-2),
  },
  {
    id: "ra2",
    title: "Remote Work: The New Normal",
    thumbnail: "https://images.pexels.com/photos/4976061/pexels-photo-4976061.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Business",
    level: "B2",
    estimated_minutes: 12,
    word_count: 920,
    difficulty: 4,
    vocabulary_highlighted: mockVocabulary.filter(v => ["meticulous", "tenacious", "pragmatic", "endeavor", "nuance"].includes(v.word)),
    paragraphs: [
      { id: "p4", order: 1, text: "The pandemic fundamentally transformed how we work. Remote work, once considered a perk, became essential for business continuity. Companies had to adapt quickly, implementing new tools and processes to support distributed teams.", vocabulary_ids: ["v3"] },
      { id: "p5", order: 2, text: "Employees discovered both benefits and challenges. The flexibility to work from anywhere improved work-life balance for many. However, the lack of face-to-face interaction made collaboration more difficult in some cases.", vocabulary_ids: [] },
      { id: "p6", order: 3, text: "Organizations must be pragmatic in their approach. Hybrid models combine the best of both worlds, allowing employees to choose when to work from home or the office. This requires careful planning and clear communication.", vocabulary_ids: ["v12"] },
    ],
    questions: [
      { id: "q5", type: "multiple_choice", question: "What changed about remote work during the pandemic?", options: ["It became less common", "It became essential for business continuity", "It was banned", "It stayed the same"], correct_answer: "It became essential for business continuity", explanation: "Paragraph 1 states that remote work became essential for business continuity during the pandemic." },
      { id: "q6", type: "true_false", question: "Remote work only had benefits for employees.", options: ["True", "False"], correct_answer: "False", explanation: "Paragraph 2 mentions both benefits and challenges of remote work." },
      { id: "q7", type: "multiple_choice", question: "What is a hybrid work model?", options: ["Working only from home", "Working only in the office", "Combining remote and office work", "Working night shifts"], correct_answer: "Combining remote and office work", explanation: "Paragraph 3 describes hybrid models as combining the best of both worlds." },
    ],
    created_at: offset(-5),
  },
  {
    id: "ra3",
    title: "Climate Science for Beginners",
    thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Science",
    level: "A2",
    estimated_minutes: 6,
    word_count: 450,
    difficulty: 2,
    vocabulary_highlighted: mockVocabulary.filter(v => ["acquire", "flourish", "refine"].includes(v.word)),
    paragraphs: [
      { id: "p7", order: 1, text: "Climate change affects everyone on Earth. Greenhouse gases trap heat in the atmosphere, causing global temperatures to rise. This warming affects weather patterns, sea levels, and ecosystems around the world.", vocabulary_ids: ["v20"] },
      { id: "p8", order: 2, text: "Scientists study these changes carefully. They use satellites, weather stations, and computer models to understand climate patterns. Their research helps predict future changes and guide policy decisions.", vocabulary_ids: [] },
    ],
    questions: [
      { id: "q8", type: "multiple_choice", question: "What do greenhouse gases do?", options: ["Cool the planet", "Trap heat in the atmosphere", "Create oxygen", "Block sunlight"], correct_answer: "Trap heat in the atmosphere", explanation: "Paragraph 1 explains that greenhouse gases trap heat in the atmosphere, causing global temperatures to rise." },
      { id: "q9", type: "true_false", question: "Climate change only affects certain regions.", options: ["True", "False"], correct_answer: "False", explanation: "Paragraph 1 states that climate change affects everyone on Earth." },
    ],
    created_at: offset(-1),
  },
  {
    id: "ra4",
    title: "IELTS Reading: Academic Writing Styles",
    thumbnail: "https://images.pexels.com/photos/1457255/pexels-photo-1457255.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "IELTS Reading",
    level: "B2",
    estimated_minutes: 15,
    word_count: 1280,
    difficulty: 5,
    vocabulary_highlighted: mockVocabulary.filter(v => ["eloquent", "ambiguous", "scrutinize", "articulate", "paradigm"].includes(v.word)),
    paragraphs: [
      { id: "p9", order: 1, text: "Academic writing requires precision and clarity. Unlike casual communication, academic texts must convey complex ideas without ambiguity. Each sentence should contribute meaningfully to the overall argument.", vocabulary_ids: ["v7", "v14"] },
      { id: "p10", order: 2, text: "Researchers must articulate their findings with meticulous attention to detail. The peer review process scrutinizes methodology, analysis, and conclusions. This rigorous evaluation ensures the quality of published research.", vocabulary_ids: ["v3", "v11", "v15"] },
    ],
    questions: [
      { id: "q10", type: "multiple_choice", question: "What distinguishes academic writing from casual communication?", options: ["More vocabulary", "Precision and lack of ambiguity", "Shorter sentences", "More personal opinions"], correct_answer: "Precision and lack of ambiguity", explanation: "Paragraph 1 states that academic texts must convey complex ideas without ambiguity." },
      { id: "q11", type: "true_false", question: "Peer review helps ensure research quality.", options: ["True", "False"], correct_answer: "True", explanation: "Paragraph 2 states that rigorous evaluation ensures the quality of published research." },
    ],
    created_at: offset(-7),
  },
  {
    id: "ra5",
    title: "The Little Prince: Chapter 1",
    thumbnail: "https://images.pexels.com/photos/17650.py?auto=compress&cs=tinysrgb&w=600",
    category: "Stories",
    level: "A2",
    estimated_minutes: 10,
    word_count: 720,
    difficulty: 2,
    vocabulary_highlighted: mockVocabulary.filter(v => ["compelling", "endeavor"].includes(v.word)),
    paragraphs: [
      { id: "p11", order: 1, text: "Once when I was six years old I saw a magnificent picture in a book about the primeval forest. It was a picture of a boa constrictor swallowing a wild beast. In the book it said: 'Boa constrictors swallow their prey whole, without chewing it.'", vocabulary_ids: ["v13"] },
      { id: "p12", order: 2, text: "I showed my masterpiece to the grown-ups, and asked them whether my drawing frightened them. But they answered: 'Frighten? Why should anyone be frightened by a hat?' My drawing was not a picture of a hat. It was a picture of a boa constrictor digesting an elephant.", vocabulary_ids: [] },
    ],
    questions: [
      { id: "q12", type: "multiple_choice", question: "What did the narrator draw at age six?", options: ["A hat", "A boa constrictor digesting an elephant", "A house", "A car"], correct_answer: "A boa constrictor digesting an elephant", explanation: "The narrator clarifies that their drawing was a boa constrictor digesting an elephant, not a hat." },
    ],
    created_at: offset(-3),
  },
  {
    id: "ra6",
    title: "Daily News: Tech Giants Report Earnings",
    thumbnail: "https://images.pexels.com/photos/53867/pexels-photo-453867.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Daily News",
    level: "B1",
    estimated_minutes: 5,
    word_count: 380,
    difficulty: 3,
    vocabulary_highlighted: mockVocabulary.filter(v => ["catalyst", "unprecedented"].includes(v.word)),
    paragraphs: [
      { id: "p13", order: 1, text: "Major technology companies reported strong earnings this quarter. Revenue growth exceeded analyst expectations, driven by increased demand for cloud services and digital products. The pandemic served as a catalyst for digital transformation across industries.", vocabulary_ids: ["v8", "v4"] },
    ],
    questions: [
      { id: "q13", type: "multiple_choice", question: "What drove revenue growth for tech companies?", options: ["Increased manufacturing", "Demand for cloud services and digital products", "Government subsidies", "Reduced competition"], correct_answer: "Demand for cloud services and digital products", explanation: "The text mentions increased demand for cloud services and digital products drove revenue growth." },
    ],
    created_at: offset(0),
  },
];

export const mockReadingSessions: ReadingSession[] = [
  { id: "rs1", article_id: "ra1", started_at: Date.now() - 7200000, completed_at: Date.now() - 6900000, reading_time_seconds: 480, quiz_score: 4, quiz_total: 4, vocabulary_learned: 3, status: "completed" },
  { id: "rs2", article_id: "ra3", started_at: Date.now() - 86400000, completed_at: Date.now() - 86100000, reading_time_seconds: 360, quiz_score: 2, quiz_total: 2, vocabulary_learned: 2, status: "completed" },
  { id: "rs3", article_id: "ra2", started_at: Date.now() - 172800000, completed_at: Date.now() - 171800000, reading_time_seconds: 720, quiz_score: 2, quiz_total: 3, vocabulary_learned: 4, status: "completed" },
];

export type ReadingPack = {
  id: string;
  title: string;
  coverGradient: string;
  lessonCount: number;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  isPremium: boolean;
  completed: number;
};

export const mockReadingPacks: ReadingPack[] = [
  { id: "rp1", title: "IELTS Reading Mastery", coverGradient: "from-teal to-indigo", lessonCount: 20, level: "B2", isPremium: true, completed: 5 },
  { id: "rp2", title: "TOEIC Reading Practice", coverGradient: "from-indigo to-coral", lessonCount: 15, level: "B1", isPremium: false, completed: 8 },
  { id: "rp3", title: "Daily News Collection", coverGradient: "from-amber to-coral", lessonCount: 30, level: "A2", isPremium: false, completed: 12 },
  { id: "rp4", title: "Business Articles", coverGradient: "from-indigo to-teal", lessonCount: 18, level: "B2", isPremium: true, completed: 2 },
  { id: "rp5", title: "Academic Papers", coverGradient: "from-coral to-amber", lessonCount: 12, level: "C1", isPremium: true, completed: 0 },
  { id: "rp6", title: "Short Stories Library", coverGradient: "from-teal to-amber", lessonCount: 25, level: "A2", isPremium: false, completed: 18 },
];