import React from "react";
import { Dropdown } from "@/shared/ui/dropdown-table/dropdowns-table.tsx";
import { DateInput } from "@/shared/ui/date-input/date-input.tsx";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;

    selectedDate: string;
    setSelectedDate: (v: string) => void;

    customDate: string;
    setCustomDate: (v: string) => void;
    canEdit?: boolean;
};

const ReqData = ["ASAP", "BEFORE", "AFTER"] as const;

const getDropdownOptions = (key: string): string[] => {
    switch (key) {
        case "date":
            return [...ReqData];
        default:
            return [];
    }
};

export const DateCell = React.memo(function DateCell({
                                                         isOpen,
                                                         onOpenChange,
                                                         selectedDate,
                                                         setSelectedDate,
                                                         customDate,
                                                         setCustomDate,
                                                         canEdit,
                                                     }: Props) {
    const value = String(selectedDate ?? "");
    const isDate = selectedDate === "BEFORE" || selectedDate === "AFTER";

    if (!canEdit) {
        return (
            <div className={`no-edit ${isDate ? "isDate" : ""}`}>
                <p className="hidden-text">{value}</p>
                {isDate && <p>{customDate}</p>}
            </div>
        );
    }

    return (
        <Dropdown
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            selected={
                <div className={isDate ? "isDate" : undefined}>
                    <p className="hidden-text" title={selectedDate}>
                        {selectedDate}
                    </p>

                    {isDate && (
                        <DateInput
                            value={customDate}
                            onChange={(value) => {
                                setCustomDate(value);
                            }}
                        />
                    )}
                </div>
            }
        >
            <ul className="dropdown-list">
                {getDropdownOptions("date").map((item: string) => (
                    <li
                        key={item}
                        onClick={() => {
                            setSelectedDate(item);
                            onOpenChange(false);
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
});