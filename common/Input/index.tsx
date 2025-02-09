import { HTMLInputTypeAttribute, useState } from "react";

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
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, maxLength = 20, customClassName, inputClassName, defaultValue, placeHolder, name, required, onChange }: InputTypes) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <label className={customClassName}>
            <span>{label}</span>
            <div className="input-container">
                <input
                    className={`input-field ${inputClassName}`}
                    name={name}
                    type={showPassword && type === "password" ? "text" : type}
                    defaultValue={defaultValue}
                    maxLength={maxLength}
                    placeholder={placeHolder}
                    onChange={onChange}
                    required={required}
                />
                {type === "password" && (
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? "🙈" : "👁️"}
                    </span>
                )}
            </div>
        </label>
    )
}

export default Input