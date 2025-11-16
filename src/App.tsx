import React from 'react';
import "./styles/main.css"
import {Navbar} from "./components/navbar/Navbar";
import {Footer} from "./components/footer/Footer";
import {Home} from "./pages/Home";
import {Courses} from "./pages/Courses";
import {CourseInfo} from "./pages/CourseInfo";
import {Routes, Route} from 'react-router-dom';
import {Contacts} from "./pages/Contacts";
import {CreateCourse} from "./components/createCource/CreateCourse";
import {Register} from "./components/register/Register";
import {Login} from "./components/login/Login";
import {Layout} from "./components/layout/Layout";
import {RequireAuth} from "./components/requireAuth/RequireAuth";
import {Roles} from "./interfaces/Roles";
import {Unauthorized} from "./components/unauthorized/Unauthorized";

function App() {
    return (
        <Routes>
            {/*публичные */}
            <Route path="/" element={<Layout/>}>

                <Route path="/" element={<Home/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>

                {/*авторизованные*/}
                <Route element={<RequireAuth allowedRoles={[Roles.User]}/>}>
                    <Route path="/courses" element={<Courses/>}/>
                    <Route path="/courses/:id" element={<CourseInfo/>}/>
                    <Route path="/courses/create" element={<CreateCourse/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>

                    <Route element={<RequireAuth allowedRoles={[Roles.Admin]}/>}>
                        {/*<Route path="/admin" element={<Contacts/>}/> заменить на админа*/}
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
