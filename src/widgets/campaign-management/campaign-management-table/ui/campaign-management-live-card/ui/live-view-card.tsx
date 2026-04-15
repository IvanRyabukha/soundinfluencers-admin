import {useEditableContentItem} from "@/entities/campaign-managment/model/campaign-management-card.helpers.ts";
import React from "react";
import {PreviewPhoto} from "@/features/campaigns/preview/preview-component.tsx";
import {
    LiveDescriptionsEditorDropdown
} from "@/widgets/campaign-management/campaign-management-table/ui/campaign-management-live-card/cells-card/live-description-editor.tsx";
import {
    ExtraFieldsCard
} from "@/widgets/campaign-management/campaign-management-table/ui/campaign-management-live-card/cells-card/extra-field.tsx";
import {getSocialMediaIcon} from "@/shared/libs/get-social-media-icon.ts";
import {ModalVideo} from "@/shared/ui/modal-video/ModalVideo.tsx";
import {VideoPreview} from "@/features/campaigns/preview/preview-video-component.tsx";
import './live-view-card.scss'
import {formatFollowers} from "@/entities/campaign-managment/model/campaign-management.helpers.ts";

interface LiveViewCardProps {
    item: any;
    networks: any[];
    canEdit?: boolean;
}

export const LiveViewCard: React.FC<LiveViewCardProps> = ({
                                                              item,
                                                              networks,
                                                              canEdit,
                                                          }) => {
    const contentId = String(item?._id ?? "");
    const merged = useEditableContentItem(contentId, item);

    const isMusic = merged?.socialMediaGroup === "music";
    const isPress = merged?.socialMediaGroup === "press";

    const showStoryTag = !isMusic && !isPress;
    const showStoryLink = !isMusic;

    const [isVideoOpen, setIsVideoOpen] = React.useState(false);
    const [descOpen, setDescOpen] = React.useState(false);
    const [selectedDescIdx, setSelectedDescIdx] = React.useState(0);

    const media0 = merged?.mediaCache?.items?.[0];
    const pathLower = media0?.pathLower;
    const videoUrl = media0?.url ?? null;
    const hasVideo = Boolean(pathLower);
    console.log(networks)
    React.useEffect(() => {
        setSelectedDescIdx(0);
    }, [contentId]);

    React.useEffect(() => {
        const descriptions = merged?.descriptions ?? [];

        if (!descriptions.length) {
            setSelectedDescIdx(0);
            return;
        }

        setSelectedDescIdx((prev) =>
            prev > descriptions.length - 1 ? descriptions.length - 1 : prev,
        );
    }, [merged?.descriptions]);

    const titleByGroup = (group: string) => {
        if (group === "music") return "Track title";
        if (group === "press") return "Artwork link";
        return "Post description";
    };

    const title = titleByGroup(String(merged?.socialMediaGroup ?? ""));

    return (
        <div className="live-view-card">
            <div className="live-view-card__content">
                <div className="live-view-card__video">
                    <div
                        role={hasVideo ? "button" : undefined}
                        style={{ cursor: hasVideo ? "pointer" : "default" }}
                        onClick={() => {
                            if (!hasVideo) return;
                            setIsVideoOpen(true);
                        }}
                    >
                        <PreviewPhoto
                            previewUrl={media0?.previewUrl}
                            pathLower={media0?.pathLower}
                            fileId={media0?.fileId}
                        />
                    </div>
                </div>

                <LiveDescriptionsEditorDropdown
                    title={title}
                    canEdit={canEdit ?? false}
                    contentId={contentId}
                    descriptions={merged?.descriptions ?? []}
                    isOpen={descOpen}
                    onToggle={() => setDescOpen((prev) => !prev)}
                    onClose={() => setDescOpen(false)}
                    selectedIdx={selectedDescIdx}
                    setSelectedIdx={setSelectedDescIdx}
                />

                <ExtraFieldsCard
                    canEdit={canEdit ?? false}
                    contentId={contentId}
                    mergedItem={merged}
                    showStoryTag={showStoryTag}
                    showStoryLink={showStoryLink}
                />

                <div className="live-view-card__fill-data">
                    <h3>Audience reach</h3>
                    <div className="fill-input-audience">
                        <div className="audience">
                            <img
                                src={getSocialMediaIcon(merged?.socialMedia as any)}
                                alt=""
                            />
                            <p>{merged?.socialMedia}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="live-view-card__fill-data">
                <h3>Networks</h3>
                <div className="network">
                    {networks.map((net) => (
                        <div
                            className="network__row"
                            key={net.addedAccountsId ?? net.socialAccountId ?? net.username}
                        >
                            <div className="network__row-logo">
                                {net.logoUrl && <img src={net.logoUrl} alt="logo" />}
                                <p>{formatFollowers(net.followers)}</p>
                            </div>
                            <p>{net.username}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isVideoOpen && (
                <ModalVideo
                    className="modal-block"
                    onClose={() => setIsVideoOpen(false)}
                >
                    <VideoPreview videoUrl={videoUrl} pathLower={pathLower} />
                </ModalVideo>
            )}
        </div>
    );
};