//@ts-nocheck
import { useState } from "react";
import styles from "./account-card.module.scss";
import {
    type AddAccountsCurrency, getCurrencySymbol,
    type SocialAccountCard,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";

import chevronDown from "../assets/Vector (17).svg";
import {getSocialMediaIcon} from "@/shared/libs/get-social-media-icon.ts";
import {GenresCountries} from "@/widgets/campaign-management-add-accounts/genres-countries/genres-countries.tsx";
import type {SocialMedia} from "@/entities/campaign-managment/model/enums.types.ts";

type Props = {
    data: SocialAccountCard;
    active: boolean;
    currency: AddAccountsCurrency;
    onClick: () => void;
};

const formatFollowers = (value?: number) => {
    const num = Number(value ?? 0);

    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;

    return String(num);
};

export const AccountCard = ({ data, active, currency, onClick }: Props) => {
    const [open, setOpen] = useState(false);

    const hasGenres = (data.musicGenres?.length ?? 0) > 0;
    const hasCountries = (data.countries?.length ?? 0) > 0;
    const hasMeta = hasGenres || hasCountries;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${styles.card} ${open ? styles.open : ""} ${active ? styles.active : ""}`}
        >
            <div className={styles.head}>
                <div className={styles.cost}>
                    <img src={data.logoUrl} alt="" />
                    <p>
                        {data.prices?.[currency] ?? 0}
                        {getCurrencySymbol(currency)}
                    </p>
                </div>

                <div className={styles.social}>
                    <img
                        src={getSocialMediaIcon(data.socialMedia as SocialMedia)}
                        alt=""
                    />
                    <p>{formatFollowers(data.followers)}</p>
                </div>
            </div>

            <div className={styles.information}>
                <div className={styles.overflow}>
                    <p>{data.username}</p>
                </div>

                <div
                    onClick={(e) => e.stopPropagation()}
                    className={styles.genresIcountries}
                >
                    {hasMeta && (
                        <div
                            onClick={() => setOpen((prev) => !prev)}
                            className={`${styles.informationHead} ${open ? styles.informationHeadActive : ""}`}
                        >
                            <img src={chevronDown} alt="" />
                        </div>
                    )}
                </div>

                {open && hasMeta && (
                    <GenresCountries
                        open={open}
                        setOpen={setOpen}
                        data={{
                            musicGenres: data.musicGenres ?? [],
                            countries: data.countries ?? [],
                        }}
                        active={active}
                    />
                )}
            </div>
        </button>
    );
};