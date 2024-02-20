// Components
import Button from "@/components/Button"

// Styles
import "./Styles.scss"

const Brand = () => {
  return (
    <form className="container mx-auto mt-8 brand-container">
      <label>
        <span>Brand Name</span>
        <input className="input-field" type="text" maxLength={20} />
      </label>
      <Button
        text="Send"
        customClassName="btn-brand bg-color-open-red"
        type="submit"
      />
    </form>
  )
}

export default Brand