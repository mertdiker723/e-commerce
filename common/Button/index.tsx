
// Styles
import "./Styles.scss"

type ButtonType = {
    text: string;
    type: "submit" | "reset" | "button";
    onClick?: () => void;
    customClassName?: string;
}

const Button = ({ text, type, customClassName, onClick }: ButtonType) => {
    return (
        <button type={type} onClick={onClick} className={`button-item ${customClassName}`}>{text}</button>
    )
}

export default Button