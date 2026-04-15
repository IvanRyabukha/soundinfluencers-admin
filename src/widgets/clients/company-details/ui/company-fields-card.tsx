import type { TInfoField } from "@/widgets/clients/company-details/model/company-details-fields.tsx";

import s from './company-details.module.scss';

interface CompanyFieldsCardProps<T> {
  data: T;
  fields: TInfoField<T>[];
}

export function CompanyFieldsCard<T>({ data, fields }: CompanyFieldsCardProps<T>) {
  return (
    <div className={s.card}>
      {fields.map((field) => {
        const value = data[field.key];

        return (
          <div key={String(field.key)} className={s.row}>
            <span className={s.label}>{field.label}</span>

            <span className={s.value}>
              {field.render ? field.render(data) : value ? String(value) : '—'}
            </span>
          </div>
        );
      })}
    </div>
  );
}
