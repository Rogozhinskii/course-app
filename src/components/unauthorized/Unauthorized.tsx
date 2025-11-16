import React from "react";
import "./style.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

export const Unauthorized = () =>{

    const navigate = useNavigate();
    const goBack = () => navigate(-1)

    return (
        <main className="section">
            <div className="container">
               <h1 className="unauthorized-title">
                   Пользователь не имеет прав на просмотр данной страницы
                   <FontAwesomeIcon icon={faTimesCircle} />
               </h1>

                <button className="btn" onClick={goBack}>
                    Назад
                </button>

            </div>
        </main>
    )
}