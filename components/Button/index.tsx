
// Styles
import "./Styles.scss"

type ButtonType = {
    text: string;
    type: "submit" | "reset" | "button";
    customClassName?: string;
}

const Button = ({ text, type, customClassName }: ButtonType) => {
    return (
        <button type={type} className={`button-item ${customClassName}`}>{text}</button>
    )
}

export default Button