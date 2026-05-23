export type BookLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type BookCategory = "Truyện ngắn" | "Kinh doanh" | "Học thuật" | "Khoa học" | "Phiêu lưu";

export type BookVocabWord = {
  word: string;
  ipa: string;
  vietnameseMeaning: string;
  englishDefinition: string;
  exampleSentence: string;
};

export type BookPageData = {
  pageNumber: number;
  paragraphs: string[];
  vocabularyWords: BookVocabWord[];
};

export type BookData = {
  id: string;
  title: string;
  author: string;
  coverGradient: string;
  level: BookLevel;
  totalPages: number;
  category: BookCategory;
  isPremium: boolean;
  rubyPrice: number;
  readCount: number;
  createdAt: string;
  shortDescription: string;
  pages: BookPageData[];
};

const today = new Date();
const offset = (d: number) => new Date(today.getTime() + d * 86400000).toISOString();

// Helper to build a generic vocab word
const w = (
  word: string,
  ipa: string,
  vi: string,
  en: string,
  ex: string,
): BookVocabWord => ({ word, ipa, vietnameseMeaning: vi, englishDefinition: en, exampleSentence: ex });

// Build mock pages quickly with original content
function makePages(seed: string, count: number, vocabSets: BookVocabWord[][]): BookPageData[] {
  const corpus = [
    `Every morning, Maya opened her notebook and wrote a single English sentence. She believed that consistent effort, even in tiny amounts, could reshape a learner over time.`,
    `The small habit grew quietly. After a month, her notebook held thirty sentences. After a year, it became a quiet record of her transformation.`,
    `Language is not a wall to climb in one day. It is a garden you tend slowly, where every word you plant returns later as a flower of fluent speech.`,
    `Reading aloud helped her ears as much as her tongue. She noticed the rhythm of English, the way some words rose like waves and others rested calmly at the end of a sentence.`,
    `When she met a new word, she did not panic. She marked it gently, looked it up, and tried to use it in her own life within the next day.`,
    `True progress, she discovered, comes from curiosity, not pressure. The learner who asks questions outlives the learner who only memorizes.`,
    `In the evenings, she revisited her favorite passages. Familiar sentences felt like old friends who welcomed her back with new lessons each time.`,
    `She built a tiny ritual: ten minutes of reading, five minutes of writing, three minutes of reflection. Tiny things repeated daily became enormous.`,
    `Mistakes were quiet teachers. Each awkward sentence she wrote taught her something her textbook could not — the texture of her own voice in English.`,
    `By the end of the year, she did not feel like a different person. She felt like the same person, but louder, clearer, and finally heard.`,
    `The most important moment in any learner's journey is the moment they choose to continue. Today is always a good day to choose again.`,
    `Confidence is built in small, private rooms long before it is shown in public. Practice in silence, then speak in the light.`,
  ];
  const pages: BookPageData[] = [];
  for (let i = 0; i < count; i++) {
    const base = i * 3 + (seed.length % 5);
    const paragraphs = [
      corpus[(base + 0) % corpus.length],
      corpus[(base + 1) % corpus.length],
      corpus[(base + 2) % corpus.length],
    ];
    pages.push({
      pageNumber: i + 1,
      paragraphs,
      vocabularyWords: vocabSets[i % vocabSets.length],
    });
  }
  return pages;
}

const vocabA: BookVocabWord[][] = [
  [
    w("consistent", "/kənˈsɪstənt/", "kiên định, đều đặn", "acting in the same way over time", "She kept a consistent study routine."),
    w("transformation", "/ˌtrænsfərˈmeɪʃn/", "sự biến đổi", "a complete change in form or character", "Her English skills underwent a transformation."),
    w("quietly", "/ˈkwaɪətli/", "lặng lẽ", "in a soft or calm manner", "The habit grew quietly each day."),
  ],
  [
    w("rhythm", "/ˈrɪðəm/", "nhịp điệu", "a strong, regular repeated pattern of sound", "She noticed the rhythm of English."),
    w("curiosity", "/ˌkjʊriˈɒsəti/", "sự tò mò", "a strong desire to know or learn something", "Curiosity is the engine of learning."),
    w("reflection", "/rɪˈflekʃn/", "sự suy ngẫm", "serious thought or consideration", "Reflection turns practice into progress."),
  ],
  [
    w("ritual", "/ˈrɪtʃuəl/", "nghi thức, thói quen", "a series of actions performed regularly", "A morning ritual brings focus."),
    w("awkward", "/ˈɔːkwəd/", "vụng về", "causing inconvenience or embarrassment", "His first sentences felt awkward."),
    w("texture", "/ˈtekstʃər/", "kết cấu, sắc thái", "the consistent quality or feel of something", "Find the texture of your own voice."),
  ],
  [
    w("confidence", "/ˈkɒnfɪdəns/", "sự tự tin", "the feeling of trust in one's abilities", "Confidence grows with quiet practice."),
    w("private", "/ˈpraɪvət/", "riêng tư", "belonging to one person only", "Real growth happens in private rooms."),
    w("continue", "/kənˈtɪnjuː/", "tiếp tục", "persist in an activity or process", "Choose to continue today."),
  ],
];

const vocabB: BookVocabWord[][] = [
  [
    w("negotiate", "/nɪˈɡəʊʃieɪt/", "đàm phán", "discuss in order to reach an agreement", "Learn to negotiate with confidence."),
    w("strategy", "/ˈstrætədʒi/", "chiến lược", "a plan of action to achieve a goal", "A clear strategy saves effort."),
    w("stakeholder", "/ˈsteɪkhəʊldə/", "bên liên quan", "a person with an interest in a business", "Every stakeholder matters."),
  ],
  [
    w("leverage", "/ˈliːvərɪdʒ/", "tận dụng", "use something to maximum advantage", "Leverage your strengths."),
    w("scalable", "/ˈskeɪləbl/", "có thể mở rộng", "able to be expanded easily", "Build a scalable system."),
    w("revenue", "/ˈrevənjuː/", "doanh thu", "income, especially of a business", "Revenue grew steadily."),
  ],
  [
    w("efficient", "/ɪˈfɪʃnt/", "hiệu quả", "achieving maximum productivity with minimum effort", "An efficient team wins quietly."),
    w("pipeline", "/ˈpaɪplaɪn/", "đường ống, chuỗi", "a system for moving things forward", "Keep the sales pipeline healthy."),
    w("milestone", "/ˈmaɪlstəʊn/", "cột mốc", "a significant stage in development", "Celebrate each milestone."),
  ],
  [
    w("disrupt", "/dɪsˈrʌpt/", "phá vỡ, đột phá", "interrupt or radically change", "New tools disrupt old habits."),
    w("ecosystem", "/ˈiːkəʊsɪstəm/", "hệ sinh thái", "a complex network of interacting parts", "A healthy ecosystem grows naturally."),
    w("execute", "/ˈeksɪkjuːt/", "thực thi", "carry out a plan", "Ideas matter less than execution."),
  ],
];

const vocabC: BookVocabWord[][] = [
  [
    w("observe", "/əbˈzɜːv/", "quan sát", "notice or perceive something", "Scientists observe nature carefully."),
    w("hypothesis", "/haɪˈpɒθəsɪs/", "giả thuyết", "a proposed explanation", "Test the hypothesis with data."),
    w("evidence", "/ˈevɪdəns/", "bằng chứng", "facts indicating whether something is true", "Strong evidence supports the claim."),
  ],
  [
    w("experiment", "/ɪkˈsperɪmənt/", "thí nghiệm", "a scientific procedure to test a hypothesis", "Repeat the experiment to confirm."),
    w("conclude", "/kənˈkluːd/", "kết luận", "arrive at a judgment by reasoning", "We conclude that practice helps."),
    w("variable", "/ˈveəriəbl/", "biến số", "an element that can change", "Control one variable at a time."),
  ],
  [
    w("phenomenon", "/fəˈnɒmɪnən/", "hiện tượng", "an observable event", "Light is a fascinating phenomenon."),
    w("approximate", "/əˈprɒksɪmət/", "xấp xỉ", "close to the actual value", "An approximate answer is still useful."),
    w("significant", "/sɪɡˈnɪfɪkənt/", "đáng kể", "sufficiently great to be worthy of attention", "We saw a significant improvement."),
  ],
  [
    w("inquiry", "/ɪnˈkwaɪəri/", "sự tìm hiểu", "an act of asking for information", "Scientific inquiry never ends."),
    w("rigor", "/ˈrɪɡə/", "tính chặt chẽ", "thoroughness and accuracy", "Rigor protects against mistakes."),
    w("model", "/ˈmɒdl/", "mô hình", "a simplified representation", "A model helps us think clearly."),
  ],
];

export const mockBooks: BookData[] = [
  {
    id: "bk-daily-stories",
    title: "Daily English Stories",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--amber), var(--coral))",
    level: "A2",
    totalPages: 12,
    category: "Truyện ngắn",
    isPremium: false,
    rubyPrice: 0,
    readCount: 5210,
    createdAt: offset(-12),
    shortDescription: "Những mẩu chuyện ngắn nhẹ nhàng giúp bạn xây dựng phản xạ đọc tiếng Anh mỗi ngày.",
    pages: makePages("daily", 12, vocabA),
  },
  {
    id: "bk-business-reader",
    title: "Business English Reader",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--indigo), var(--teal))",
    level: "B2",
    totalPages: 10,
    category: "Kinh doanh",
    isPremium: true,
    rubyPrice: 100,
    readCount: 2380,
    createdAt: offset(-7),
    shortDescription: "Tuyển tập bài đọc môi trường công sở, đàm phán, chiến lược và lãnh đạo.",
    pages: makePages("biz", 10, vocabB),
  },
  {
    id: "bk-science-simple",
    title: "Science in Simple English",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--teal), var(--indigo))",
    level: "B1",
    totalPages: 10,
    category: "Khoa học",
    isPremium: false,
    rubyPrice: 0,
    readCount: 3120,
    createdAt: offset(-3),
    shortDescription: "Khoa học đời sống được kể bằng tiếng Anh dễ hiểu, phù hợp người mới.",
    pages: makePages("sci", 10, vocabC),
  },
  {
    id: "bk-short-stories-b1",
    title: "Short Stories for B1 Learners",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--coral), var(--amber))",
    level: "B1",
    totalPages: 8,
    category: "Truyện ngắn",
    isPremium: false,
    rubyPrice: 0,
    readCount: 4180,
    createdAt: offset(-20),
    shortDescription: "Truyện ngắn trình độ B1 với từ vựng được chú thích trực tiếp trên trang.",
    pages: makePages("short", 8, vocabA),
  },
  {
    id: "bk-academic-reading",
    title: "Academic Reading Practice",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--indigo), var(--coral))",
    level: "C1",
    totalPages: 10,
    category: "Học thuật",
    isPremium: true,
    rubyPrice: 100,
    readCount: 1620,
    createdAt: offset(-1),
    shortDescription: "Luyện kỹ năng đọc học thuật theo phong cách IELTS với chú giải dễ hiểu.",
    pages: makePages("aca", 10, vocabC),
  },
  {
    id: "bk-adventure",
    title: "Adventure Stories for English Learners",
    author: "EnglishUp Editorial",
    coverGradient: "linear-gradient(135deg, var(--amber), var(--teal))",
    level: "A2",
    totalPages: 8,
    category: "Phiêu lưu",
    isPremium: false,
    rubyPrice: 0,
    readCount: 2790,
    createdAt: offset(-30),
    shortDescription: "Phiêu lưu nhẹ nhàng giúp bạn vừa đọc vừa nuôi cảm hứng học tiếng Anh.",
    pages: makePages("adv", 8, vocabA),
  },
];

export function getBookById(id: string): BookData | undefined {
  return mockBooks.find((b) => b.id === id);
}

export const bookCategories: BookCategory[] = [
  "Truyện ngắn",
  "Kinh doanh",
  "Học thuật",
  "Khoa học",
  "Phiêu lưu",
];
export const bookLevels: BookLevel[] = ["A1", "A2", "B1", "B2", "C1"];