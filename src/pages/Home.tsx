import React from "react";
import {Header} from "../components/header/Header";

export const Home = () => {
    return (
        <>
            <Header/>
            <main className="section">
                <div className="container">
                    <div className="project-details">
                        <h2 className="title-1">Skills</h2>

                        <ul className="content-list">
                            <li className="content-list__item">
                                <h2 className="title-2">Frontend</h2>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad cumque aliquam
                                    eveniet,
                                    illum
                                    possimus
                                    sapiente nihil. At nostrum tenetur a laboriosam. Deserunt earum dolorem dolor.
                                    Vero
                                    accusantium
                                    aliquid saepe molestias.</p>
                            </li>
                            <li className="content-list__item">
                                <h2 className="title-2">Backend</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis obcaecati
                                    dolorum
                                    necessitatibus aliquam suscipit asperiores quos soluta possimus sunt nisi
                                    laboriosam
                                    animi
                                    sit
                                    est
                                    eius, at beatae numquam vitae error.</p>
                            </li>

                        </ul>

                    </div>
                </div>
            </main>
        </>

    )
}