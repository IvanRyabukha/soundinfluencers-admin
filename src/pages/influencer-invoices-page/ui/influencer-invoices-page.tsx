import { PageBreadcrumbs } from "@/widgets/page-breadcrumbs";
import { PageTitle } from "@/widgets/page-title";
import { SearchByQuery } from "@/features/search";
import { InfluencerInvoicesTable } from "@/widgets/influencer-invoices/influencer-invoices-table";
import { invoicesTableMock } from "@/entities/influencer-invoices/model/influencer-invoices.types.ts";

import {
  useInfluencerInvoicesPageState
} from "@/pages/influencer-invoices-page/model/use-influencer-invoices-page-state.ts";

import s from './influencer-invoices-page.module.scss';
import { Pagination } from "@/shared/ui";

export const InfluencerInvoicesPage = () => {
  const {
    page,
    handlePageChange,
    searchValue,
    handleSearchChange,
  } = useInfluencerInvoicesPageState();

  return (
    <div className={s.influencerInvoicesPage}>
      <PageBreadcrumbs
        items={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Invoices influencers" },
        ]}
      />

      <div className={s.content}>
        <PageTitle
          title="Invoices influencers"
        />

        <div className={s.tableWrapper}>
          <SearchByQuery value={searchValue} onChange={handleSearchChange}/>

          <InfluencerInvoicesTable
            data={invoicesTableMock}
          />

          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={1}
          />
        </div>
      </div>
    </div>
  );
};
