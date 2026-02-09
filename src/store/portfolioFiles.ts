import { defineStore } from "pinia";
import type { PortfolioFile } from "@/types/portfolioFile";
import { fetchUserFileList, fetchUserFileDetail } from "@/api/userFile";

export const usePortfolioFilesStore = defineStore("portfolioFiles", {
    state: () => ({
        items: [] as PortfolioFile[],
        detail: null as PortfolioFile | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async loadList() {
            this.loading = true;
            this.error = null;
            try {
                this.items = await fetchUserFileList();
            } catch (e: any) {
                this.error = e?.message ?? "파일 목록 조회 실패";
            } finally {
                this.loading = false;
            }
        },

        async loadDetail(fileNo: number | string) {
            this.loading = true;
            this.error = null;
            try {
                this.detail = await fetchUserFileDetail(fileNo);
            } catch (e: any) {
                this.error = e?.message ?? "파일 상세 조회 실패";
            } finally {
                this.loading = false;
            }
        },
    },
});
