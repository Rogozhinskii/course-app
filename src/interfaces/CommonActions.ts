export type ToggleIsFetchingActionType = {
    type: "TOGGLE-IS-FETCHING"
    isFetching: boolean;
}

export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {type: "TOGGLE-IS-FETCHING", isFetching: isFetching}
}