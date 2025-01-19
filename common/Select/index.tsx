import { useEffect, useState } from "react";

// Styles
import "./Styles.scss";

type BaseType = {
    _id: number | string;
    name: string;
};

type SelectTypes<T extends BaseType> = {
    data: T[];
    label: string;
    name: string;
    defaultValue: T | undefined;
};

const Select = <T extends BaseType>({ data, label, name, defaultValue }: SelectTypes<T>) => {
    const [renderKey, setRenderKey] = useState(0);
    const currentValue = defaultValue?._id || -1;

    useEffect(() => {
        setRenderKey(prevKey => prevKey + 1);
    }, [defaultValue, data]);

    return (
        <label>
            <span>{label}</span>
            <select key={renderKey} className="input-field" defaultValue={currentValue} name={name}>
                <option value={-1} disabled>Choose a {label}</option>
                {data && data.map(item => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                ))}
            </select>
        </label>
    );
};

export default Select;
