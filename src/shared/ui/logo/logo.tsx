import { Link } from "react-router-dom";

import logo from '@/assets/logo/logo.svg';
import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <Link className={styles.logo} to="/">
      <img
        src={logo}
        alt={`Soundinfluencers logo`}
      />
    </Link>
  );
};
