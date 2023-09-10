import QuizBrowser from "@/components/QuizBrowser";
import { quizzes } from "@/constants/quizzes";
import { Quiz } from "@/types/Quiz";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center p-16 gap-8 bg-slate-900">
            <h1 className="font-semibold text-4xl text-white">Quizzes</h1>
            <QuizBrowser quizzes={quizzes} />
        </main>
    );
}
