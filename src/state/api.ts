import axios from "axios";
import {config} from "../config/env";
import {CourseType} from "../components/course/CourseCard";



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
    }
}