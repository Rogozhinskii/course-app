import React, {useState} from "react";
import addIcon from "../../img/icons/patch-plus.svg"
import eraserIcon from "../../img/icons/eraser.svg"
import {TextArea} from "../textArea/TextArea";
import {TextField} from "../textField/TextField";
import {IContentBlock} from "../../interfaces/IContentBlock";
import {v1} from "uuid";
import "./style.css"




export interface ITextBlockEditorProps {
    onContentChanged: (blocks: IContentBlock[]) => void;
    error?: string;
}


export const TextBlockEditor = (props: ITextBlockEditorProps) => {
    const [blocks, setBlocks] = useState<IContentBlock[]>([]);

    const addBlockHandler = () => {
        const updated: IContentBlock[] = [...blocks, {
            id: uuidToHash(v1()),
            title: "",
            content: "",
        }];
        setBlocks(updated);
        props.onContentChanged(updated);
    }

    function uuidToHash(uuid: string): number {
        let hash = 0;
        for (let i = 0; i < uuid.length; i++) {
            hash = (hash << 5) - hash + uuid.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }

    const updateBlockHandler = (blockId: number, field: "title" | "content", value: string) => {
        const updated = blocks.map(b => b.id === blockId ? {...b, [field]: value} : b);
        setBlocks(updated);
        props.onContentChanged(updated);
    }

    const removeBlockHandler = (blockId: number) => {
        const updated = blocks.filter(b => b.id !== blockId)
        setBlocks(updated);
        props.onContentChanged(updated);
    }

    return (
        <div className="text-blocks-editor">
            <div className="text-blocks-header">
                {blocks.length === 0 && <p className="empty-msg">Нет добавленных блоков</p>}
                <button className="icon-btn add-btn"
                        onClick={addBlockHandler}>
                    <img src={addIcon} alt="icon"/>
                </button>
            </div>
            <ul className="text-blocks-list">
                {
                    blocks.map((b) => {
                        return <li key={b.id} className="text-block-item">
                            <TextField onContentChanged={(v) => updateBlockHandler(b.id, "title", v)}/>
                            <TextArea onContentChanged={(v) => updateBlockHandler(b.id, "content", v)} rows={10}/>
                            <button className="icon-btn delete-btn"
                                    onClick={() => removeBlockHandler(b.id)}>
                                <img src={eraserIcon} alt="icon"/>
                            </button>
                        </li>
                    })
                }
            </ul>

        </div>
    )
}