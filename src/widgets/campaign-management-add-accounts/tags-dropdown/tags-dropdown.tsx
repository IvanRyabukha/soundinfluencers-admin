import { useEffect, useRef, useState } from "react";
import chevron from "./assets/chevron-down.svg";
import styles from "./tags-dropdown.module.scss";

type Props = {
    items: string[];
    placeholder?: string;
};

export const TagsDropdown = ({ items, placeholder = "—" }: Props) => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 600);
        onResize();
        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };

        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, []);

    const list = items?.filter(Boolean) ?? [];
    const preview = list.length ? list.slice(0, 1) : [];

    return (
        <div className={styles.tagsDd} ref={ref}>
            <button
                type="button"
                className={styles.tagsDdBtn}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <div className={styles.tagsDdPreview}>
                    {!isMobile && (
                        <>
                            {preview.length ? (
                                preview.map((t, i) => (
                                    <span className={styles.tag} key={i} title={t}>
                    {t}
                  </span>
                                ))
                            ) : (
                                <span className={styles.tagsDdPlaceholder}>{placeholder}</span>
                            )}

                            {list.length > 1 && (
                                <span className={styles.tagsDdMore}>+{list.length - 1}</span>
                            )}
                        </>
                    )}
                </div>

                <img
                    className={`${styles.tagsDdChevron} ${open ? styles.open : ""}`}
                    src={chevron}
                    alt=""
                />
            </button>

            {open && (
                <div className={styles.tagsDdMenu} role="listbox">
                    {list.length ? (
                        list.map((t, i) => (
                            <div className={styles.tagsDdItem} key={i} title={t}>
                                {t}
                            </div>
                        ))
                    ) : (
                        <div className={styles.tagsDdEmpty}>No data</div>
                    )}
                </div>
            )}
        </div>
    );
};