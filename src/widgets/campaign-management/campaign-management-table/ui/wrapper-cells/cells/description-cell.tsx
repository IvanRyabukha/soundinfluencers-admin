
//@ts-nocheck
import React from "react";
import check from "./assets/check.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "@/shared/ui/dropdown-table/dropdowns-table";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;

  platformItems: any[];
  selectedContent: number;

  selectedPd: number;
  group: string;
  setSelectedPd: (v: number) => void;
    onOpenChange: (open: boolean) => void;
  status?: string;
};

export const DescriptionCell = React.memo(function DescriptionCell({
                                                                     isOpen,
                                                                     onToggle,
                                                                     onClose,
                                                                     platformItems,
                                                                     selectedContent,
                                                                     selectedPd,
                                                                     setSelectedPd,
                                                                     group,
                                                                     status,
    onOpenChange
                                                                   }: Props) {
  const descriptions = platformItems?.[selectedContent]?.descriptions ?? [];
  const isLocked = status === "closed" || status === "completed";

  const normalizeLink = React.useCallback((value: string) => {
    if (!value) return "#";
    return value.startsWith("http") ? value : `https://${value}`;
  }, []);

    const selectPd = React.useCallback(
        (idx: number) => {
            if (isLocked) return;
            setSelectedPd(idx);
            onOpenChange(false);
        },
        [setSelectedPd, onOpenChange, isLocked],
    );

  if (isLocked || descriptions.length <= 1) {
    return (
        <td className="tableBase__td">
          {group !== "press" ? (
              <div className="no-edit">
                <p className="hidden-text desc">
                  {descriptions?.[selectedPd]?.description || "—"}
                </p>
              </div>
          ) : descriptions?.[selectedPd]?.description ? (
              <Link
                  to={normalizeLink(descriptions?.[selectedPd]?.description)}
                  target="_blank"
              >
                <p className="hidden-text tagged-link">
                  {descriptions?.[selectedPd]?.description}
                </p>
              </Link>
          ) : (
              <p className="hidden-text tagged-link">—</p>
          )}
        </td>
    );
  }

  return (
      <>
          {group !== "press" ? (
              <Dropdown
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  selected={
                      <p className="hidden-text desc">
                          {descriptions?.[selectedPd]?.description || "—"}
                      </p>
                  }
              >
                  <ul className="dropdown-list">
                      {descriptions.map((desc: any, optionIndex: number) => (
                          <li
                              title={desc?.description}
                              key={desc?._id ?? optionIndex}
                              onClick={() => selectPd(optionIndex)}
                          >
                <span className={selectedPd === optionIndex ? "active" : ""}>
                  {optionIndex + 1}
                </span>{" "}
                              <p className="hidden-text desc">{desc.description || "-"}</p>
                              {selectedPd === optionIndex && (
                                  <img className="check" src={check} alt="" />
                              )}
                          </li>
                      ))}
                  </ul>
              </Dropdown>
          ) : (
              <p>{descriptions?.[selectedPd]?.description || "—"}</p>
          )}</>
  );
});