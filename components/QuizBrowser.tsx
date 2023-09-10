"use client";

import { Quiz } from "@/types/Quiz";
import Image from "next/image";
import { HiUser } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function QuizBrowser({ quizzes }: { quizzes: Quiz[] }) {
    const router = useRouter();

    function handleStartButtonClicked(quiz: Quiz) {
        router.push(`/quiz?id=${quiz.id}`);
    }

    return (
        <div className="bg-slate-800 w-1/2 rounded-lg p-10 flex flex-col gap-8">
            {quizzes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="from-indigo-400 to-indigo-500 bg-gradient-to-b text-white rounded-lg min-w-full p-4 flex gap-4"
                >
                    <img
                        className="rounded"
                        src={quiz.img}
                        alt=""
                        width={100}
                        height={100}
                    />
                    <div className="flex flex-col w-2/3 gap-1">
                        <h1 className="capitalize text-2xl font-semibold">
                            {quiz.title}
                        </h1>
                        <div className="text-slate-200">{quiz.desc}</div>
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex items-center gap-2">
                                <HiUser />
                                {quiz.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <AiFillStar />
                                {quiz.rating}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-1/3">
                        <button
                            className="text-black font-semibold p-4 rounded-xl w-36 from-slate-100 to-slate-200 bg-gradient-to-b"
                            onClick={() => handleStartButtonClicked(quiz)}
                        >
                            Start
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
