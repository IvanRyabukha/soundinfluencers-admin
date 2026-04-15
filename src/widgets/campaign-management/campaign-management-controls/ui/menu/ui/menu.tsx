import React from "react";
import img from "../../assets/menu.svg";
import close from "../../assets/x.svg";
import styles from "./menu.module.scss";
import pdf from "../../assets/iwwa_file-pdf.svg";
import whatsApp from "../../assets/logos_whatsapp-icon (1).svg";
import check from "../../assets/check-circle.svg";
import reopen from "../../assets/refresh-ccw.svg";
import { toast } from "react-toastify";
import {closeCampaign, reopenCampaign} from "@/entities/campaign-managment/api/campaign-controls.api.ts";
import {getPDF} from "@/entities/campaign-managment/model/campaign-management.helpers.ts";


export const Menu = ({
                         status,
                         campaignId,
                     }: {
    status: string;
    campaignId: string | null;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const handleCloseCampaign = async () => {
        if (!campaignId || isLoading) return;

        try {
            setIsLoading(true);
            await closeCampaign(campaignId);
            toast.success("Campaign closed successfully");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to close campaign");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReopenCampaign = async () => {
        if (!campaignId || isLoading) return;

        try {
            setIsLoading(true);
            await reopenCampaign(campaignId);
            toast.success("Campaign reopened successfully");
            setIsOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to reopen campaign");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                type="button"
                className={styles.menu}
                onClick={() => setIsOpen(true)}
            >
                <img src={img} alt="" />
                Menu
            </button>

            <div
                className={`${styles.drawerRoot} ${isOpen ? styles.open : ""}`}
                aria-hidden={!isOpen}
            >
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                />

                <aside className={styles.drawer}>
                    <div className={styles.drawerHeader}>
                        <h2 className={styles.title}>Menu</h2>

                        <button
                            type="button"
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <img src={close} alt="" />
                        </button>
                    </div>

                    <div className={styles.drawerBody}>
                        <div className={styles.drawerBody__content}>
                            <div className={styles.drawerBody__block}>
                                <button onClick={() => getPDF(campaignId || '')}
                                    type="button"
                                    className={styles.drawerBodyButton}
                                >
                                    <img src={pdf} alt="" />
                                    <p>PDF file</p>
                                </button>

                                {status === "completed" ? (
                                        <button
                                            type="button"
                                            className={styles.drawerBodyButton}
                                            onClick={handleReopenCampaign}
                                            disabled={isLoading}
                                        >
                                            <img src={reopen} alt="" />
                                            <p>Reopen Campaign</p>
                                        </button>

                                ) : (
                                    <button
                                        type="button"
                                        className={styles.drawerBodyButton}
                                        onClick={handleCloseCampaign}
                                        disabled={isLoading}
                                    >
                                        <img src={check} alt="" />
                                        <p>Close Campaign</p>
                                    </button>
                                )}
                            </div>

                            <div className={styles.drawerBody__block}>
                                <button
                                    type="button"
                                    className={styles.drawerBodyButton}
                                >
                                    <img src={whatsApp} alt="" />
                                    <p>Send all</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};