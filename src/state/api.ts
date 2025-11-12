import axios from "axios";
import {config} from "../config/env";
import {IDirectionInfo} from "../interfaces/IDirectionInfo";
import {ICustomTest} from "../interfaces/ICustomTest";
import {ICourseType} from "../interfaces/ICourseType";
import {ICourseDirection} from "../interfaces/ICourseDirection";
import {ICreateCourseDto} from "../dto/ICreateCourseDto";
import {ICourseDto} from "../dto/ICourseDto";
import {ICreateCustomTestDto} from "../dto/customTest/CreateCustomTestDto";
import {createSlice} from "@reduxjs/toolkit";
import {IFilterDto} from "../interfaces/IFilterDto";


export enum ResponseStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
}

const instanse = axios.create({
    baseURL: config.apiConfig.baseUrl,
    timeout: config.apiConfig.timeout,
})

export const ImageUrl = `${config.apiConfig.baseUrl}/static`;

export const coursesAPI = {
    getCourses() {
        return instanse.get<ICourseType[]>('/courses')
    },

    createCourse(course: ICreateCourseDto): Promise<string> {
        return instanse.post<string>(`/courses`, course)
            .then(res => res.data);
    },

    getCourseById(id: string): Promise<ICourseDto> {
        return instanse.get<ICourseDto>(`/courses/${id}`)
            .then(res => res.data);
    },

    setImage(courseId: string, image: File) {
        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("image", image);

        return instanse.post("/courses/save-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },

    getDirectionsInfos() {
        return instanse.get<IDirectionInfo[]>('/direction-info')
            .then((response) => {
                return response.data;
            })
    },

    createCustomTest(data: ICreateCustomTestDto) {
        return instanse.post<ICustomTest>('/custom-test', data)
            .then(res => res.data);
    },

    getCustomTests() {
        return instanse.get<ICustomTest[]>(`/custom-test`)
    },

    getCoursesDirections() {
        return instanse.get<ICourseDirection[]>("/course-direction")
    },
    getFilteredCourses(dto: IFilterDto){
        return instanse.get<ICourseType[]>('/courses/filter', {
            params: {
                directionId: dto.directionId,
                hasTest: dto.hasTest,
                studyTime: dto.studyTime,
            }
        })
    }
}

export function parseAxiosError(err: unknown): string {
    if (axios.isAxiosError(err)) {
        return err.response?.data || err.message;
    }
    return "Неизвестная ошибка";
}

