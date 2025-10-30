import React, {ChangeEvent, useState, DragEvent, useEffect} from "react";
import {ImageInputProps} from "../../interfaces/ITextFieldProps";
import "./style.css"



export const ImageInput= (props: ImageInputProps) => {
    const externalError: string|null = props.error ?? null;
    const errorMessage: string = externalError ?? "Выберите изображение"

    useEffect(() => {
        setError(externalError);
    }, [externalError]);

    const [error, setError] = useState<string | null>(externalError);
    const [isDragOver, setIsDragOver] = useState(false);
    const [fileLoaded, setFileLoaded] = useState(false);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setError(errorMessage);
            setFileLoaded(true);
            return;
        }

        setError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            props.onContentChanged(base64);
            setFileLoaded(true);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="image-input-container">
            <div
                className={`image-drop-zone ${isDragOver ? "drag-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                Перетащите изображение сюда или нажмите для выбора
            </div>

            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
            />

            {error && <p className="error-message">{error}</p>}
            {fileLoaded && !error && <p className="image-input-success">Файл выбран</p>}
        </div>
    );
};