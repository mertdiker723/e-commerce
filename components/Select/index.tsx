
// Styles
import "./Styles.scss";


type SelectTypes = {
    data: any[];
    label: string;
    name: string;
}
const Select = ({ data, label, name }: SelectTypes) => {
    return (
        <label>
            <span>{label}</span>
            <select className="input-field" defaultValue={-1} name={name}>
                <option value={-1} disabled>Choose a {label}</option>
                {data && data.map(item => {
                    const { id, name } = item;
                    return <option key={id} value={id}>{name}</option>
                })}
            </select>
        </label>
    )
}

export default Select