import React from "react";
import menu from "../assets/menu.svg";
import grid from "../assets/grid.svg";
import styles from "./accounts-view-switch.module.scss";

interface Props {
    view: any;
    setView: (view: any) => void;
    className?: string;
    base?: boolean;
}

const VIEW_ITEMS: Array<{ key: any; icon: string; alt: string }> = [
    { key: "table", icon: menu, alt: "Table view" },
    { key: "grid", icon: grid, alt: "Grid view" },
];

export const SwitchView: React.FC<Props> = ({
                                                view,
                                                setView,
                                                className = "",
                                                base = false,
                                            }) => {
    return (
        <div className={`${styles.changeView} ${base ? styles.base : ""} ${className}`}>
            <div className={styles.changeView__content}>
                {VIEW_ITEMS.map((item, index) => (
                    <button
                        key={item.key}
                        type="button"
                        className={`${styles.changeViewCheck} ${view === item.key ? styles.active : ""}`}
                        onClick={() => setView(item.key)}
                        aria-pressed={view === item.key}
                    >
                        <img src={item.icon} alt={item.alt} />
                        {index === 0 && <span className={styles.divider} />}
                    </button>
                ))}
            </div>
        </div>
    );
};