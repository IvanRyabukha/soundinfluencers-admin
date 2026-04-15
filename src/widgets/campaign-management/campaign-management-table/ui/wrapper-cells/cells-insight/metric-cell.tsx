import React from "react";

type Props = {
    value?: number | null;
    canEdit?: boolean;
    onChange?: (value: number | null) => void;
};

export const MetricCell = ({ value, canEdit = false, onChange }: Props) => {
    const [inputValue, setInputValue] = React.useState(
        value !== null && value !== undefined ? String(value) : "",
    );

    React.useEffect(() => {
        setInputValue(value !== null && value !== undefined ? String(value) : "");
    }, [value]);

    if (!canEdit) {
        return <p>{value ?? "-"}</p>;
    }

    return (
        <input
            type="number"
            value={inputValue}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
                const nextValue = e.target.value;
                setInputValue(nextValue);

                if (nextValue === "") {
                    onChange?.(null);
                    return;
                }

                onChange?.(Number(nextValue));
            }}
            style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
            }}
        />
    );
};