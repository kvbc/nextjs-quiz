"use client";

import { getQuiz, quizzes } from "@/constants/quizzes";
import { Question } from "@/types/Question";
import { assert } from "console";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbArrowBack } from "react-icons/tb";

export default function Quiz() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const quizID = searchParams.get("id");
    const quiz = getQuiz(quizID ?? "");
    if (quiz == undefined) throw new Error("quiz not found");

    const [questNum, setQuestNum] = useState<number>(1);
    const quest: Question | null = quiz?.quests[questNum - 1] ?? null;
    const [choiceIdx, setChoiceIdx] = useState<number | null>(null);
    const [secsLeft, setSecsLeft] = useState<number | null>(
        quest == null ? null : quest.time + 1
    );
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

    useEffect(() => {
        if (
            quest != null &&
            secsLeft != null &&
            secsLeft > 0 &&
            choiceIdx == null
        ) {
            let id = setTimeout(
                () =>
                    setSecsLeft((prevSecsLeft) => (prevSecsLeft as number) - 1),
                1000
            );
            return () => clearTimeout(id);
        }
    }, [choiceIdx, secsLeft, quest]);

    useEffect(() => {
        setChoiceIdx(null);
        if (quest != null) setSecsLeft(quest.time + 1);
    }, [questNum, quest]);

    useEffect(() => {
        if (choiceIdx != null) {
            let id = setTimeout(
                () => setQuestNum((prevQuestNum) => prevQuestNum + 1),
                3000
            );
            return () => clearTimeout(id);
        } else if (secsLeft != null && secsLeft <= 0) setChoiceIdx(-1);
    }, [secsLeft, choiceIdx]);

    function handleBackButtonClicked() {
        router.push("/");
    }

    function handleChoiceClicked(clickedChoiceIdx: number) {
        if (choiceIdx == null) {
            if (clickedChoiceIdx == quest?.correctChoiceIdx)
                setCorrectAnswersCount((prevCount) => prevCount + 1);
            setChoiceIdx(clickedChoiceIdx);
        }
    }

    function handleRetakeButtonClicked() {
        window.location.reload();
    }

    const scorePercentage = Math.floor(
        (correctAnswersCount / quiz.quests.length) * 100
    );

    return (
        <>
            <button
                className="text-white fixed left-1/2 top-8 flex items-center gap-2 hover:text-slate-300"
                onClick={handleBackButtonClicked}
            >
                <TbArrowBack />
                Back
            </button>
            <main className="bg-slate-900 h-screen p-40">
                <div className="bg-slate-800 rounded-2xl h-full w-full flex flex-col p-6 gap-8 items-center overflow-hidden">
                    {quest != null ? (
                        <>
                            <div className="flex w-full">
                                <div className="w-1/2 text-white flex justify-start text-4xl font-extralight">
                                    {quest.msg}
                                </div>
                                <div className="w-1/2 text-white flex justify-end text-4xl font-semibold">
                                    {questNum} / {quiz?.quests.length}
                                </div>
                            </div>
                            <img
                                src={quest.img}
                                alt=""
                                width={400}
                                height={400}
                                className="max-h-80"
                            />
                            <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-4">
                                {quest.choices.map((choice, i) => {
                                    let bg = "bg-slate-900";
                                    if (choiceIdx != null) {
                                        if (i == quest.correctChoiceIdx)
                                            bg = "bg-green-500";
                                        else if (i == choiceIdx)
                                            bg = "bg-red-500";
                                    }
                                    return (
                                        <button
                                            key={i} // sorri
                                            className={`text-white p-4 ${bg} transition-colors rounded-xl w-full h-full flex items-center`}
                                            onClick={() =>
                                                handleChoiceClicked(i)
                                            }
                                        >
                                            {choice}
                                        </button>
                                    );
                                })}
                            </div>
                            {secsLeft != null && (
                                <div
                                    style={{
                                        transitionProperty: "transform",
                                        transitionDuration: `${
                                            secsLeft == quest.time + 1
                                                ? "0s"
                                                : "1s"
                                        }`,
                                        transitionTimingFunction: "linear",
                                        transform: `translateX(-${
                                            100 -
                                            ((secsLeft - 1) / quest.time) * 100
                                        }%)`,
                                    }}
                                    className={`w-[105%] bg-slate-100 h-6 -mb-6`}
                                ></div>
                            )}{" "}
                        </>
                    ) : (
                        <div className="w-max h-full flex flex-col justify-center items-center gap-8">
                            <img
                                src="https://pngimg.com/d/racing_flag_PNG24.png"
                                alt=""
                                width={200}
                                height={200}
                                style={{
                                    filter: "drop-shadow(4px 4px 0 rgb(51 65 85)) drop-shadow(-4px -4px 0 rgb(51 65 85)) drop-shadow(4px -4px 0 rgb(51 65 85)) drop-shadow(-4px 4px 0 rgb(51 65 85))",
                                }}
                                className="animate-pulse"
                            />
                            <h1 className="text-6xl font-semibold text-white">
                                The End!
                            </h1>
                            <p className="text-slate-300">
                                You&apos;ve answered{" "}
                                <text className="font-bold text-white">
                                    {correctAnswersCount}
                                </text>{" "}
                                out of{" "}
                                <text className="font-bold text-white">
                                    {quiz.quests.length}
                                </text>{" "}
                                questions correctly and ended up with a score of{" "}
                                <text
                                    className={`font-bold ${
                                        scorePercentage >= 75
                                            ? "text-green-500"
                                            : scorePercentage >= 30
                                            ? "text-orange-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {scorePercentage}%
                                </text>
                            </p>
                            <button
                                key={quiz.id}
                                className="from-indigo-400 to-indigo-500 bg-gradient-to-b text-white rounded-lg w-1/2 p-4 flex gap-4 justify-center items-center"
                                onClick={handleRetakeButtonClicked}
                            >
                                Retake Quiz
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
