import type { Dispatch, SetStateAction } from "react";
import styles from "./genres-countries.module.scss";

type Props = {
    data: {
        musicGenres: string[];
        countries: any[];
    };
    active?: boolean;
    open?: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const GenresCountries = ({
                                    data,
                                    active = false,
                                    open = false,
                                }: Props) => {
    return (
        <div
            data-open={open}
            className={`${styles.popup} ${active ? styles.selected : ""}`}
        >
            <div className={styles.content}>
                {data.musicGenres.length > 0 && (
                    <div className={styles.genres}>
                        <h3>Genres</h3>
                        <ul>
                            {data.musicGenres.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {data.countries.length > 0 && (
                    <div className={styles.countries}>
                        <h3>Countries</h3>
                        <ul>
                            {data.countries.map((cr, i) => (
                                <li key={i}>
                                    {cr.country} {cr.percentage}%
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};