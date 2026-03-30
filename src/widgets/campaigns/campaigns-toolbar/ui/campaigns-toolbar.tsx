import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks/use-debounce.ts";
import { parseAsString, useQueryState } from "nuqs";
import { CreateCampaignLink } from "@/features/campaigns/create-campaign";
import { ImportCampaignsXlsx } from "@/features/campaigns/import-campaigns-xlsx";
import { Search } from "@/features/search";
import { FilterCampaignsByStatus } from "@/features/campaigns/filter-campaigns-by-status";

import styles from './campaigns-toolbar.module.scss';

export const CampaignsToolbar = () => {
  const [query, setQuery] = useQueryState("query",
    parseAsString.withDefault(""),
  );

  const [localValue, setLocalValue] = useState(query);
  const debounceValue = useDebounce(localValue, 400);

  useEffect(() => {
    void setQuery(debounceValue || null, { history: "replace" });
  }, [debounceValue, setQuery]);

  useEffect(() => {
    setLocalValue(query);
  }, [query]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <CreateCampaignLink />
        <ImportCampaignsXlsx />
      </div>

      <Search
        className={styles.search}
        value={localValue}
        onSearchChange={setLocalValue}
      />
      <FilterCampaignsByStatus />
    </div>
  )
}
