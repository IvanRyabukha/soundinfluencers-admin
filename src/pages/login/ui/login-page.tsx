import { LoginForm } from "@/features/auth-by-email";

import styles from './login-page.module.scss';

export function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
