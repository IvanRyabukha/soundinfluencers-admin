import React from "react";
// import chevronDown from "@/assets/icons/chevron-down.svg";
import styles from "./dropdown-select.module.scss";

type Props = {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    selected: string;
    isCompact?: boolean;
    className?: string;
};

export const DropdownSelect: React.FC<Props> = ({
                                                    isOpen,
                                                    setOpen,
                                                    children,
                                                    selected,
                                                    isCompact = false,
                                                    className,
                                                }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!isOpen) return;

        const onDown = (e: MouseEvent | TouchEvent) => {
            const el = ref.current;
            if (!el) return;
            if (e.target instanceof Node && !el.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", onDown);
        document.addEventListener("touchstart", onDown);

        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("touchstart", onDown);
        };
    }, [isOpen, setOpen]);

    return (
        <div
            ref={ref}
            className={`${styles.dropdown} ${isCompact ? styles.compact : ""} ${className ?? ""}`}
        >
            <button
                type="button"
                className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
                onClick={() => setOpen((prev) => !prev)}
            >
                <span>{selected}</span>
                {/*<img*/}
                {/*    src={chevronDown}*/}
                {/*    alt=""*/}
                {/*    className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}*/}
                {/*/>*/}
            </button>

            {isOpen && <div className={styles.menu}>{children}</div>}
        </div>
    );
};