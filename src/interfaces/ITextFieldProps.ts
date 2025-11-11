export interface ITextFielBaseProps {
    onContentChanged: (text: string) => void;
    error?: string;
}

export interface ITextFieldProps extends ITextFielBaseProps  {
    onKeyUp?: (key: string) => void;
}

export interface ITextAreaProps extends ITextFielBaseProps {
    rows: number;
}

export interface ImageInputProps {
    onContentChanged: (file: File) => void;
    error?: string;
}
