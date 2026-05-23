import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CircleCheck, Circle, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { ReadingArticle } from "@/mock";
import { useReadingStore } from "@/store/useReadingStore";

export function ReadingQuiz({
  article,
  onComplete,
  onBack,
}: {
  article: ReadingArticle;
  onComplete: () => void;
  onBack: () => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{ correct: boolean; userAnswer: string }>>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const { endSession, getCurrentSession } = useReadingStore();

  const questions = article.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const correctCount = answers.filter((a) => a.correct).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;
    setAnswers([...answers, { correct: isCorrect, userAnswer: selectedAnswer || "" }]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
      const session = getCurrentSession();
      if (session) {
        endSession(session.id, correctCount, questions.length, article.vocabulary_highlighted.length);
      }
    }
  };

  if (quizCompleted) {
    return (
      <QuizCompletion
        score={correctCount}
        total={questions.length}
        percent={scorePercent}
        onRetry={() => {
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setShowResult(false);
          setAnswers([]);
          setQuizCompleted(false);
        }}
        onClose={() => {
          onComplete();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground">Câu hỏi {currentQuestionIndex + 1}/{questions.length}</div>
          <h2 className="font-display text-lg font-semibold">Bài kiểm tra</h2>
        </div>
        <div className="w-20" />
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="rounded-lg border border-border bg-card p-5 shadow-card">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {currentQuestion.type === "multiple_choice" ? "Trắc nghiệm" : currentQuestion.type === "true_false" ? "Đúng/Sai" : "Điền từ"}
          </div>
          <p className="font-display text-lg font-semibold leading-relaxed">
            {currentQuestion.question}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {currentQuestion.type === "fill_blank" ? (
            <div className="space-y-3">
              <input
                type="text"
                value={selectedAnswer || ""}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                className="w-full rounded-lg border border-border bg-card p-4 text-base focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                disabled={showResult}
              />
            </div>
          ) : (
            currentQuestion.options?.map((option, idx) => {
              const isCorrect = option === currentQuestion.correct_answer;
              const isSelected = option === selectedAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(option)}
                  disabled={showResult}
                  className={`w-full rounded-lg border-2 p-4 text-left text-sm font-medium transition-all ${
                    showCorrect
                      ? "border-teal bg-teal/15 text-teal"
                      : showWrong
                        ? "border-coral bg-coral/15 text-coral"
                        : isSelected
                          ? "border-teal bg-teal/5"
                          : "border-border hover:border-teal/50 hover:bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{option}</span>
                    {showCorrect && <CircleCheck className="h-5 w-5" />}
                    {showWrong && <Circle className="h-5 w-5" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Result & Explanation */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className={`rounded-lg border p-4 ${
              selectedAnswer === currentQuestion.correct_answer
                ? "border-teal/30 bg-teal/5"
                : "border-coral/30 bg-coral/5"
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {selectedAnswer === currentQuestion.correct_answer ? (
                  <>
                    <CircleCheck className="h-5 w-5 text-teal" />
                    <span className="font-semibold text-teal">Chính xác!</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-5 w-5 text-coral" />
                    <span className="font-semibold text-coral">Chưa đúng</span>
                  </>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Đáp án đúng:</span> {currentQuestion.correct_answer}
              </div>
              <p className="mt-2 text-sm">{currentQuestion.explanation}</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        {!showResult ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={!selectedAnswer}
            className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
          >
            Kiểm tra
          </Button>
        ) : (
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-teal text-teal-foreground hover:bg-teal/90"
          >
            {currentQuestionIndex < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
          </Button>
        )}
      </motion.div>
    </div>
  );
}

function QuizCompletion({
  score,
  total,
  percent,
  onRetry,
  onClose,
}: {
  score: number;
  total: number;
  percent: number;
  onRetry: () => void;
  onClose: () => void;
}) {
  const resultColor =
    percent >= 80
      ? "text-teal"
      : percent >= 60
        ? "text-amber"
        : "text-coral";

  return (
    <div className="mx-auto max-w-md space-y-6 px-4 py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex justify-center">
          <div className={`flex h-24 w-24 items-center justify-center rounded-full ${percent >= 80 ? "bg-teal/15" : "bg-amber/15"}`}>
            <Trophy className={`h-12 w-12 ${resultColor}`} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-3xl font-bold">
            {percent >= 80 ? "Tuyệt vời!" : percent >= 60 ? "Khá tốt!" : "Hãy cố gắng hơn!"}
          </h2>
          <div className={`font-display text-5xl font-bold ${resultColor}`}>
            {percent}%
          </div>
          <p className="text-base text-muted-foreground">
            {score} / {total} câu đúng
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        <Button onClick={onRetry} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Làm lại
        </Button>
        <Button onClick={onClose} className="w-full bg-teal text-teal-foreground hover:bg-teal/90">
          Hoàn thành
        </Button>
      </div>
    </div>
  );
}
