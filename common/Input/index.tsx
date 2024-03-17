import { HTMLInputTypeAttribute } from "react";

// Styles
import "./Styles.scss"

type InputTypes = {
    label: string;
    type?: HTMLInputTypeAttribute | undefined;
    name?: string;
    maxLength?: number;
    defaultValue?: string;
    customClassName?: string;
    inputClassName?: string;
    placeHolder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, maxLength = 20, customClassName, inputClassName, defaultValue, placeHolder, name, onChange }: InputTypes) => {
    return (
        <label className={customClassName}>
            <span>{label}</span>
            <input
                className={`input-field ${inputClassName}`}
                name={name}
                type={type}
                defaultValue={defaultValue}
                maxLength={maxLength}
                placeholder={placeHolder}
                onChange={onChange}
            />
        </label>
    )
}

export default Input