import styles from "./save-reset.module.scss";
import save from "../assets/lsicon_save-outline.svg";
import x from "../assets/x.svg";

type Props = {
    onSave: () => void | Promise<void>;
    onReset: () => void;
    isSaving?: boolean;
};

export const SaveReset = ({
                              onSave,
                              onReset,
                              isSaving = false,
                          }: Props) => {
    return (
        <div className={styles.saveReset}>
            <button
                type="button"
                className={styles.button}
                onClick={onSave}
                disabled={isSaving}
            >
                <img src={save} alt="" />
                <p>{isSaving ? "Saving..." : "Save"}</p>
            </button>

            <button
                type="button"
                className={styles.button}
                onClick={onReset}
                disabled={isSaving}
            >
                <img src={x} alt="" />
                <p>Reset</p>
            </button>
        </div>
    );
};