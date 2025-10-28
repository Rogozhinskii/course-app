import React, {useEffect} from "react";
import {Header} from "../components/header/Header";
import {DirectionInfo} from "../components/directionInfo/DirectionInfo";
import {v1} from "uuid";
import {IDirectionInfo} from "../interfaces/IDirectionInfo";
import {useAppDispatch, useAppSelector} from "../state/store";
import {requestDirectionsInfos} from "../state/directionInfo-reducer";

export const Home = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestDirectionsInfos())
    }, []);

    const directionInfoState = useAppSelector(state=>state.directionsInfosState);
    const directions = directionInfoState.directionsInfos
    return (
        <>
            <Header/>
            <main className="section">
                <div className="container">
                    <div className="course-details">
                        <h2 className="title-1">Основные направления</h2>

                        <ul className="content-list">
                            {
                                directions.map((d: IDirectionInfo) => <DirectionInfo key={d.id}
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