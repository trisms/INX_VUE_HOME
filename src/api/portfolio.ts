import { http } from "@/lib/http";
import type { ApiListResponse, PortfolioFile } from "@/types/portfolioFile";

export async function getPortfolioList() {
    // 백엔드가 GET /portfolio/list 로 열려있다면:
    const { data } = await http.get<ApiListResponse<PortfolioFile[]>>("/portfolio/list");
    return data.list;
}

export async function getPortfolioDetail(id: number | string) {
    // 1) 백엔드에 상세 API가 있으면 이게 정석:
    // const { data } = await http.get<ApiDetailResponse<PortfolioFile>>(`/portfolio/${id}`);
    // return data.item;

    // 2) 아직 상세 API가 없으면: list에서 찾아서 쓰는 임시 방식
    const list = await getPortfolioList();
    const found = list.find((x) => String(x.fileNo) === String(id));
    if (!found) throw new Error("해당 포트폴리오를 찾을 수 없어요.");
    return found;
}
