import React from "react";
import { Link } from "react-router-dom";
import type { IDashboardNavItem } from "@/widgets/dashboard/dashboard-nav-section";

import styles from './dashboard-nav-section.module.scss';

interface DashboardNavSectionProps {
  title: string;
  items: IDashboardNavItem[];
}

export const DashboardNavSection: React.FC<DashboardNavSectionProps> = ({
  title,
  items,
}) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>

      <ul className={styles.list}>
        {items.map((item) => (
          <Link key={item.to} to={item.to} className={styles.card}>
            <img
              src={item.icon}
              alt={item.label}
              className={styles.icon}
            />
            {item.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};
