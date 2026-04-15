//@ts-nocheck

import React from "react";
import eye from "./assets/eye.svg";
import check from "./assets/check (2).svg";
import { Dropdown } from "@/shared/ui/dropdown-table/dropdowns-table.tsx";
import { Modal } from "@/shared/ui/modal/modal.tsx";
import {VideoPreview} from "@/features/campaigns/preview/preview-video-component.tsx";

type Props = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;

    platformItems: any[];
    selectedContent: number;
    setSelectedContent: (v: number) => void;

    setSelectedPd: (v: number) => void;
    socialMedia?: string;
    media0?: any;
    group: string;
    canEdit?: boolean;
    status?: string;
};

export const ContentCell = React.memo(function ContentCell({
                                                               isOpen,
                                                               onOpenChange,
                                                               platformItems,
                                                               selectedContent,
                                                               setSelectedContent,

                                                               socialMedia,
                                                               media0,
                                                               group,
                                                               status,
                                                           }: Props) {
    const [popUp, setPopUp] = React.useState(false);
    const [selectedVideo, setSelectedVideo] = React.useState({
        index: 1,
        link: "",
    });

    const isLocked = status === "closed" || status === "completed";

    const onClickSelect = React.useCallback(
        (optionIndex: number) => {
            if (isLocked) return;
            setSelectedContent(optionIndex);
            onOpenChange(false);
        },
        [setSelectedContent, onOpenChange, isLocked],
    );

    const onClickVideo = React.useCallback(
        (optionIndex: number, link: string) => {
            setSelectedVideo({ index: optionIndex + 1, link });
            setPopUp(true);
        },
        [],
    );


    const closeModal = React.useCallback(() => {
        setPopUp(false);
    }, []);

    const selectedLink = platformItems?.[selectedContent]?.mainLink;
    const pathLower = media0?.pathLower;
    const videoUrl = media0?.url ?? null;
    const groupTitle = (group: string) => {
        switch (group) {
            case "main":
                return "Video";
            case "music":
                return "Song";
            case "press":
                return "Press";
            default:
                return "";
        }
    };

    const onClickHeaderEye = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = platformItems?.[selectedContent]?.mainLink ?? "";
        onClickVideo(selectedContent, link);
    };

    if (isLocked || platformItems?.length <= 1) {
        return (
            <>
                <div className="content-cell-static no-edit">
                    <span onClick={onClickHeaderEye} className="eye">
                        <img src={eye} alt="" />
                    </span>
                    <p title={selectedLink}>
                        {selectedLink
                            ? `${groupTitle(group)} ${selectedContent + 1}`
                            : "—"}
                    </p>
                </div>

                {popUp && (
                    <Modal onClose={closeModal}>
                        <div className="modal-card">
                            <h2>Video {selectedVideo.index}</h2>
                            {media0 ? (
                                <VideoPreview
                                    className="modal-card-video"
                                    videoUrl={videoUrl}
                                    pathLower={pathLower}
                                />
                            ) : (
                                <input type="text" value={selectedLink} readOnly />
                            )}
                        </div>
                    </Modal>
                )}
            </>
        );
    }

    return (
        <>
            <Dropdown
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                content
                selected={
                    <div className="content-cell-static">
                        <span onClick={onClickHeaderEye} className="eye">
                            <img src={eye} alt="" />
                        </span>
                        <p title={selectedLink}>
                            {selectedLink
                                ? `${groupTitle(group)} ${selectedContent + 1}`
                                : "—"}
                        </p>
                    </div>
                }
            >
                <ul className="dropdown-list">
                    {platformItems?.map((item: any, optionIndex: number) => (
                        <li
                            className={`content-cell ${
                                selectedContent === optionIndex ? "active-content" : ""
                            }`}
                            key={`${item?._id ?? optionIndex}-${socialMedia}`}
                            onClick={() => onClickSelect(optionIndex)}
                        >
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClickVideo(optionIndex, item.mainLink);
                                }}
                                className="eye"
                            >
                                <img src={eye} alt="" />
                            </span>

                            {item.mainLink
                                ? `${groupTitle(group)} ${optionIndex + 1}`
                                : "—"}

                            {selectedContent === optionIndex && (
                                <img className="check" src={check} alt="" />
                            )}
                        </li>
                    ))}
                </ul>
            </Dropdown>

            {popUp && (
                <Modal onClose={closeModal}>
                    <div className="modal-card">
                        <h2>Video {selectedVideo.index}</h2>
                        {media0 ? (
                            <VideoPreview
                                className="modal-card-video"
                                videoUrl={videoUrl}
                                pathLower={pathLower}
                            />
                        ) : (
                            <input type="text" value={selectedLink} readOnly />
                        )}
                    </div>
                </Modal>
            )}
        </>
    );
});