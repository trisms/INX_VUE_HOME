export type PortfolioFile = {
    fileName: string;
    fileOriginName: string;
    fileNo: number;
    dataStatus: number;
    fileSize: number;
    filePath: string;
    enabled: string; // 'Y' | 'N' (또는 숫자면 number로)
    insertDate: string;
    putUserId: string;
    updateDate?: string | null;
    modUserId?: string | null;
};

export type ApiListResponse<T> = {
    result: string; // "200"
    list: T;
};
