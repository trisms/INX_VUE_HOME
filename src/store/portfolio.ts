import { defineStore } from "pinia";
import type { Portfolio, PortfolioDetail } from "@/api/portfolio";
import { fetchPortfolioList, fetchPortfolioDetail } from "@/api/portfolio";

export const usePortfolioStore = defineStore("portfolio", {
    state: () => ({
        list: [] as Portfolio[],
        detail: null as PortfolioDetail | null,
        loadingList: false,
        loadingDetail: false,
        error: null as string | null,
    }),

    actions: {
        async loadList() {
            this.loadingList = true;
            this.error = null;
            try {
                this.list = await fetchPortfolioList();
            } catch (e: any) {
                this.error = e?.message ?? "목록 조회 실패";
            } finally {
                this.loadingList = false;
            }
        },

        async loadDetail(id: number | string) {
            this.loadingDetail = true;
            this.error = null;
            try {
                this.detail = await fetchPortfolioDetail(id);
            } catch (e: any) {
                this.error = e?.message ?? "상세 조회 실패";
            } finally {
                this.loadingDetail = false;
            }
        },
    },
});
