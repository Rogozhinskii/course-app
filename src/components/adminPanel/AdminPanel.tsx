import React, {useEffect, useState} from "react";
import {UserWithCoursesDto} from "../../interfaces/UserWithCoursesDto";
import {coursesAPI, parseAxiosError} from "../../state/api";
import {setLoadingAC} from "../../state/app-reducer";
import {useDispatch} from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import "./style.css"

export const AdminPanel = () => {
    const [data, setData] = useState<UserWithCoursesDto[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadData = async () =>{
            dispatch(setLoadingAC(true))
            try {
                const data = await coursesAPI.getUsersWithCourses()
                setData(data)
            }catch(err){
                if (axios.isAxiosError(err)) {
                    toast.error(parseAxiosError(err))
                } else {
                    toast.error('Ошибка при получении данныех.')
                }

            }finally {
                dispatch(setLoadingAC(false))

            }
        }
        loadData()
    }, [dispatch]);

    return (
        <main className="section">
           <div className="container">
               <h1 className="admin-title">Панель администратора</h1>
               <div className="table-wrapper">
                   <table className="admin-table">
                       <thead>
                       <tr>
                           <th>Email</th>
                           <th>Название курса</th>
                           <th>Направление</th>
                       </tr>
                       </thead>
                       <tbody>
                       {data.length > 0 ? (
                           data.map((row, index) => (
                               <tr key={index}>
                                   <td>{row.email}</td>
                                   <td>{row.courseTitle}</td>
                                   <td>{row.courseDirection}</td>
                               </tr>
                           ))
                       ) : (
                           <tr>
                               <td colSpan={3} className="no-data">Данные отсутствуют</td>
                           </tr>
                       )}
                       </tbody>
                   </table>
               </div>
           </div>
        </main>
    )

}