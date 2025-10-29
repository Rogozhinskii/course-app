export interface ITextFielBaseProps {
    onContentChanged: (text: string) => void;
}

export interface ITextFieldProps extends ITextFielBaseProps  {
    onKeyUp?: (key: string) => void;
}

export interface ITextAreaProps extends ITextFielBaseProps {
    rows: number;
}

export interface ImageInputProps extends ITextFielBaseProps  {

}
