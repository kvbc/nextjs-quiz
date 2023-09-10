import { Quiz } from "@/types/Quiz";

export const quizzes: Quiz[] = [
    {
        id: "1",
        title: "Cats",
        desc: "this is a very long description",
        author: "James",
        rating: 4.6,
        img: "https://img.freepik.com/darmowe-zdjecie/czerwony-lub-bialy-kot-i-na-bialym-studio_155003-13189.jpg?w=360",
        quests: [
            {
                msg: "what do cats like?",
                choices: ["food", "good food", "idk", "everything"],
                correctChoiceIdx: 2,
                img: "https://www.hepper.com/wp-content/uploads/2021/10/Gray-cat-eating-from-the-bowl_Skrypnykov-Dmytro_Shutterstock.jpg",
                time: 10,
            },
            {
                msg: "what do cats do every day?",
                choices: ["sleep", "more sleep", "play games", "eat a lot"],
                correctChoiceIdx: 2,
                img: "https://i.pinimg.com/1200x/06/d1/0a/06d10a021452836e0093bb642df9ce87.jpg",
                time: 15,
            },
        ],
    },
    {
        id: "2",
        title: "Dogs",
        desc: "dogs are better than cats, and so is this quiz!",
        author: "Me",
        rating: 9000,
        img: "https://images.unsplash.com/photo-1554224311-beee415c201f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nJTIwZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
        quests: [
            {
                msg: "are dogs cool?",
                choices: ["yes", "yes!", "yes!!!", "yes!!"],
                correctChoiceIdx: 2,
                img: "https://www.k9ofmine.com/wp-content/uploads/2022/01/cool-dog-names-850x520.jpg",
                time: 5,
            },
            {
                msg: "do you prefer dogs or cats?",
                choices: ["dogs", "ddogs", "dogs", "dogs"],
                correctChoiceIdx: 3,
                img: "https://d.newsweek.com/en/full/1898130/dog-cat-under-sheet.jpg",
                time: 60,
            },
            {
                msg: "what do dogs have?",
                choices: ["legs", "drip", "paws", "tails"],
                correctChoiceIdx: 1,
                img: "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/116092080_3144034532349223_2530090215976667705_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=107&_nc_ohc=zZYypm8gzYAAX9gg1kS&edm=AP_V10EBAAAA&ccb=7-5&oh=00_AfCiNQSbw-iWZ6VklrGNw4eGUay-A3jt1L9-A8REUcjERQ&oe=64FF38E4&_nc_sid=2999b8",
                time: 10,
            },
        ],
    },
];

export function getQuiz(id: string): Quiz | undefined {
    return quizzes.find((quiz) => quiz.id == id);
}
