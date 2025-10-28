import axios from "axios";
import {config} from "../config/env";
import {CourseType} from "../components/course/CourseCard";
import {IDirectionInfo} from "../interfaces/IDirectionInfo";
import {ICustomTest} from "../interfaces/ICustomTest";


export enum ResponseStatus {
    OK = 200,
    CREATED = 201,
}

const instanse = axios.create({
    baseURL: config.apiConfig.baseUrl,
    timeout: config.apiConfig.timeout,
})


export const coursesAPI = {
    getCourses(){
        return instanse.get<CourseType[]>('/courses')
            .then((response) => {
                return response.data;
            })
    },

    getDirectionsInfos() {
        return instanse.get<IDirectionInfo[]>('/directionsInfos')
            .then((response) => {
                return response.data;
            })
    },

    createCustomTest(data: ICustomTest){
        return instanse.post('/customTest', data)
    },

    getCustomTests(){
        return instanse.get<ICustomTest>(`/customTest`)
            .then((res)=>{
                return res.data;
            })
    }
}