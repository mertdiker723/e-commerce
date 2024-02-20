// Components
import Button from "@/components/Button"

// Styles
import "./Styles.scss"

const Category = () => {
    return (
        <form className="container mx-auto mt-8 category-container">
            <label>
                <span>Category Name</span>
                <input className="input-field" type="text" maxLength={20} />
            </label>
            <Button
                text="Send"
                customClassName="btn-category bg-color-open-red"
                type="submit"
            />
        </form>
    )
}

export default Category