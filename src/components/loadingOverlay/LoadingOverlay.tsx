import React from "react";
import {useAppSelector} from "../../state/store";
import "./style.css"

export const LoadingOverlay = () => {
    const isLoading = useAppSelector(state => state.app.isLoading); // глобальный флаг

    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Пожалуйста, подождите...</p>
        </div>
    );
};