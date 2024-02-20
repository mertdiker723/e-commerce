
// Styles
import { HTMLInputTypeAttribute } from "react";
import "./Styles.scss"

type InputTypes = {
    label: string;
    type: HTMLInputTypeAttribute | undefined;
    name?: string;
    maxLength?: number;
    customClassName?: string;
    inputClassName?: string;
    placeHolder?: string;
    onChange?: () => void;
}

const Input = ({ label, type, maxLength = 20, customClassName, inputClassName, placeHolder, onChange, name }: InputTypes) => {
    return (
        <label className={customClassName}>
            <span>{label}</span>
            <input
                className={`input-field ${inputClassName}`}
                name={name}
                type={type}
                maxLength={maxLength}
                placeholder={placeHolder}
                onChange={onChange}
            />
        </label>
    )
}

export default Input