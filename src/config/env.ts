import baseConfig from "./env.json"

export interface ApiConfig {
    baseUrl: string;
    timeout: number;
}

export interface AppConfig {
    apiConfig: ApiConfig;
}

export const config: AppConfig = {
    apiConfig: {
        baseUrl: baseConfig.api.baseUrl,
        timeout: baseConfig.api.timeout,
    }
}

export const getApiConfig = (): ApiConfig => config.apiConfig;