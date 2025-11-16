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
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";

function App() {
    return (
        <div className="App">
            <Router>

                <Routes>
                    {/*публичные */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>

                    {/*авторизованные*/}
                    <Route path="/courses" element={<Courses />}/>
                    <Route path="/courses/:id" element={<CourseInfo />}/>
                    <Route path="/courses/create" element={<CreateCourse/>}/>
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
