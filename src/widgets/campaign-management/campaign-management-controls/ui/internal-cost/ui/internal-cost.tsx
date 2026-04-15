import styles from './internal-cost.module.scss'
export const InternalCost = ({internalCost}: {internalCost: number}) => {
    return (
        <div className={styles.internal}>
            <p>Internal Cost: {internalCost}€</p>
        </div>
    );
};