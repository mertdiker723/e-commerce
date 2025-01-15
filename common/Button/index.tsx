
// Styles
import "./Styles.scss"

type ButtonType = {
    text: string;
    type: "submit" | "reset" | "button";
    onClick?: () => void;
    customClassName?: string;
    loading?: boolean;
}

const Button = ({ text, type, customClassName, onClick, loading }: ButtonType) => {
    return (
        <button type={type} onClick={onClick} className={`button-item ${customClassName}`} disabled={loading}>
            {text}
            {loading ? <span className="loader"></span> : null}
        </button>
    )
}

export default Button