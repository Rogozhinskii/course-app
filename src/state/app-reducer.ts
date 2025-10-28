export type SetLoadingAction = {
    type: "SET-LOADING"
    isLoading: boolean
}
export type ActionsType = SetLoadingAction

export interface IAppState {
    isLoading: boolean
}

const initialState: IAppState = {
    isLoading: false,
}

export const appReducer = (state : IAppState = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default:
            return state
    }
}

export const setLoadingAC = (isLoading: boolean): SetLoadingAction => {
    return {type: "SET-LOADING", isLoading: isLoading}
}