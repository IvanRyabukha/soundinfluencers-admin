import {useCampaignManagementStore} from "@/entities/campaign-managment/store/campaign-management.store.ts";


export const useCampaignView = () =>
    useCampaignManagementStore((s) => s.view);

export const useSetCampaignView = () =>
    useCampaignManagementStore((s) => s.setView);

export const useCampaignStatus = () =>
    useCampaignManagementStore((s) => s.status);

export const useCampaignEditable = () =>
    useCampaignManagementStore((s) => s.isEditable());

export const useCampaignItems = () =>
    useCampaignManagementStore((s) => s.editable?.campaignContent ?? []);

export const useCampaignNetworks = () =>
    useCampaignManagementStore((s) => s.editable?.addedAccounts ?? []);

export const useCampaignData = () =>
    useCampaignManagementStore((s) => s.editable);