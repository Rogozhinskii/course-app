import React from 'react';
import "./styles/main.css"
import {Navbar} from "./components/navbar/Navbar";
import {Footer} from "./components/footer/Footer";
import {Home} from "./pages/Home";
import {Courses} from "./pages/Courses";
import {CourseInfo} from "./pages/CourseInfo";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Contacts} from "./pages/Contacts";
import {CreateCourse} from "./components/createCource/CreateCourse";
import {LoadingOverlay} from "./components/loadingOverlay/LoadingOverlay";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/courses" element={<Courses />}/>
                    <Route path="/course/:id" element={<CourseInfo />}/>
                    <Route path="/course/create" element={<CreateCourse/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                </Routes>
                <LoadingOverlay/>
                <Footer/>
                <Toaster position="top-center"/>
            </Router>
        </div>
    );
}

export default App;
