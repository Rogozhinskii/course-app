import axios from "axios";
import {config} from "../config/env";
import {IDirectionInfo} from "../interfaces/IDirectionInfo";
import {ICustomTest} from "../interfaces/ICustomTest";
import {ICourseType} from "../interfaces/ICourseType";
import {ICourseDirection} from "../interfaces/ICourseDirection";


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
        return instanse.get<ICourseType[]>('/courses')
    },

    createCourse(course: ICourseType){
        return axios.post(`/courses`, course);
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
    },

    getCoursesDirections(){
        return instanse.get<ICourseDirection[]>("/coursesDirections")
    }
}