import React from "react";

type Props = {
    value?: string;
};

export const PressContentCell: React.FC<Props> = ({ value }) => {
    if (!value) return <span>—</span>;

    return (
        <a
            href={value}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline" }}
        >
            {value}
        </a>
    );
};