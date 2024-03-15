import { useEffect, useState } from "react";

// Styles
import "./Styles.scss";

type SelectTypes = {
    data: any[];
    label: string;
    name: string;
    defaultValue: string | undefined;
}
const Select = ({ data, label, name, defaultValue }: SelectTypes) => {
    const [renderKey, setRenderKey] = useState(0);
    const currentValue = defaultValue || -1

    useEffect(() => {
        setRenderKey(prevKey => prevKey + 1);
    }, [defaultValue, data]);

    return (
        <label>
            <span>{label}</span>
            <select key={renderKey} className="input-field" defaultValue={currentValue} name={name}>
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