import styles from "./account-row.module.scss";
import {
    type AddAccountsCurrency, getCurrencySymbol,
    type SocialAccountCard,
} from "@/entities/campaign-managment-add-accounts/model/add-accounts.types";
import {getSocialMediaIcon} from "@/shared/libs/get-social-media-icon.ts";
import {TagsDropdown} from "@/widgets/campaign-management-add-accounts/tags-dropdown/tags-dropdown.tsx";
import {AccountCheckbox} from "@/features/campaign-management-add-accounts/account-checkbox/ui/account-checkbox.tsx";

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

export const AccountRow = ({ data, active, currency, onClick }: Props) => {
    const genres = [...(data.musicGenres ?? []), ...(data.categories ?? [])].filter(Boolean);
    const countries =
        data.countries?.map((item) => `${item.country} ${item.percentage}%`) ?? [];

    return (
        <button
            type="button"
            className={`${styles.row} ${active ? styles.active : ""}`}
        >
            <div className={styles.name}>
                <AccountCheckbox
                    label={data.username}
                    checked={active}
                    onChange={onClick}
                />
            </div>

            <div className={styles.price}>
                <img src={data.logoUrl} alt="" />
                <span>
          {data.prices?.[currency] ?? 0}
                    {getCurrencySymbol(currency)}
        </span>
            </div>

            <div className={styles.followers}>
                <img src={getSocialMediaIcon(data.socialMedia as any)} alt="" />
                <span>{formatFollowers(data.followers)}</span>
            </div>

            <div className={styles.genres}>
                <TagsDropdown items={genres} placeholder="No genres" />
            </div>

            <div className={styles.countries}>
                <TagsDropdown items={countries} placeholder="No countries" />
            </div>
        </button>
    );
};