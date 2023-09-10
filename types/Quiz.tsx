import { Question } from "./Question";

export type Quiz = {
    id: string;
    img: string;
    title: string;
    desc: string;
    author: string;
    rating: number;
    quests: Question[];
};
