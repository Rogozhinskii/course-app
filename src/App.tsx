import React from 'react';
import "./styles/main.css"
import {Navbar} from "./components/navbar/Navbar";
import {Footer} from "./components/footer/Footer";
import {Home} from "./pages/Home";
import {Projects} from "./pages/Projects";
import {v1} from "uuid";
import {ProjectType} from "./components/project/Project";
import project01 from "./img/projects/01.jpg"
import project01big from "./img/projects/01-big.jpg"
import project02 from "./img/projects/02.jpg"
import project02big from "./img/projects/02-big.jpg"
import project03 from "./img/projects/03.jpg"
import project03big from "./img/projects/03-big.jpg"
import project04 from "./img/projects/04.jpg"
import project04big from "./img/projects/04-big.jpg"
import project05 from "./img/projects/05.jpg"
import project05big from "./img/projects/05-big.jpg"
import project06 from "./img/projects/06.jpg"
import project06big from "./img/projects/06-big.jpg"
import {ProjectInfo} from "./pages/ProjectInfo";

function App() {

    let projects: ProjectType[] = [
        {
            id: v1(),
            title: "Gaming streaming portal",
            skills: "Bla-bla-bla",
            imageUri: project01,
            imageBig: project01big
        },
        {
            id: v1(),
            title: "Video service",
            skills: "Bla-bla-bla",
            imageUri: project02,
            imageBig: project02big
        },
        {
            id: v1(),
            title: "Video portal",
            skills: "Bla-bla-bla",
            imageUri: project03,
            imageBig: project03big
        },
        {
            id: v1(),
            title: "Dating app",
            skills: "Bla-bla-bla",
            imageUri: project04,
            imageBig: project04big
        },
        {
            id: v1(),
            title: "Landing",
            skills: "Bla-bla-bla",
            imageUri: project05,
            imageBig: project05big
        },
        {
            id: v1(),
            title: "Gaming community",
            skills: "Bla-bla-bla",
            imageUri: project06,
            imageBig: project06big
        },

    ]

    return (
        <div className="App">
            <Navbar />
            {/*  <Home/>*/}
            {/*<Projects projects={projects} />*/}
            <ProjectInfo id={projects[0].id} title={projects[0].title} skills={projects[0].skills} image={projects[0].imageUri} />
            <Footer />
            {/*<div className="page">
                <Navbar />
                <Home/>
                <Projects />
                <Contacts/>
                <Footer />
            </div>*/}
        </div>
    );
}

export default App;
