
// Components
import Button from "@/components/Button";
import Input from "@/components/Input";

// Styles
import "./Styles.scss";

const Product = () => {
    return (
        <form className="container mx-auto mt-8 product-container">
            <Input label="Product Name:" type="text" maxLength={30} placeHolder="Product Name" name="productName" />
            <Input label="Product Detail:" type="text" maxLength={50} placeHolder="Product Detail" name="productDetail" />
            <Input label="Price:" type="number" maxLength={10} placeHolder="Price" name="price" />
            <Input label="Date:" type="date" name="date" />

            <label>
                <span>Brand: </span>
                <select className="input-field">
                    <option />
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </label>
            <label>
                <span>Category: </span>
                <select className="input-field">
                    <option />
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </select>
            </label>
            <Button
                text="Send"
                customClassName="btn-product bg-color-open-red"
                type="submit"
            />
        </form>
    )
}

export default Product