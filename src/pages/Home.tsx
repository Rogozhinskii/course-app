import React from "react";
import {Header} from "../components/header/Header";
import {DirectionInfo} from "../components/directionInfo/DirectionInfo";
import {v1} from "uuid";


type DirectionInfo = {
    id: string;
    title: string;
    description: string;
}

export const Home = () => {

    const [directions, setDirections] = React.useState<DirectionInfo[]>([
        {
            id: v1(),
            title: "Изучай материалы",
            description: "Открывайте библиотеку курсов, статей и интерактивных заданий по самым разным темам —\n" +
                "от программирования и дизайна до психологии и иностранных языков.\n" +
                "Каждый материал сопровождается рекомендациями и обратной связью.",

        },
        {
            id: v1(),
            title: "Создавай собственные курсы",
            description: "Используйте встроенный редактор для создания обучающих модулей,\n" +
                "добавляйте видео, тесты и текстовые блоки. Делитесь своими знаниями\n" +
                "с сообществом или создавайте закрытые курсы для команды.",

        },
        {
            id: v1(),
            title: "Развивай навыки",
            description: "Следите за своим прогрессом, проходите челленджи,\n" +
                "получайте достижения и прокачивайте профессиональные и личные навыки.\n" +
                "Учёба — это игра, где главный приз — ваше развитие.",

        },
    ]);


    return (
        <>
            <Header/>
            <main className="section">
                <div className="container">
                    <div className="course-details">
                        <h2 className="title-1">Основные направления</h2>

                        <ul className="content-list">
                            {
                                directions.map((d: DirectionInfo) => <DirectionInfo key={d.id}
                                                                                    id={d.id}
                                                                                    title={d.title}
                                                                                    description={d.description}/>)
                            }

                        </ul>

                    </div>
                </div>
            </main>
        </>

    )
}