import {Outlet} from "react-router-dom";
import {Navbar} from "../navbar/Navbar";
import {LoadingOverlay} from "../loadingOverlay/LoadingOverlay";
import {Footer} from "../footer/Footer";
import {Toaster} from "react-hot-toast";
import React from "react";


export const Layout = () => {
    return (
        <div className="App">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <LoadingOverlay/>
            <Footer/>
            <Toaster position="top-center"/>
        </div>

    )
}