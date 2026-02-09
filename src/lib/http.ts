import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 예: http://localhost:8080/api
    timeout: 15000,
    withCredentials: false, // 쿠키 인증이면 true
    headers: {
        "Content-Type": "application/json",
    },
});

// 요청 인터셉터 (토큰 등)
http.interceptors.request.use((config) => {
    // const token = localStorage.getItem("accessToken");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 응답 인터셉터 (에러 공통 처리)
http.interceptors.response.use(
    (res) => res,
    (err) => {
        // 여기서 401 처리, 공통 toast 등 가능
        return Promise.reject(err);
    }
);
