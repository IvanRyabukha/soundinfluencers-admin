import styles from "./search-input.module.scss";
// import searchIcon from "@/assets/icons/search (1).svg";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: Props) => {
    return (
        <div className={styles.root}>
            {/*<img src={searchIcon} alt="" />*/}
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search"
            />
        </div>
    );
};