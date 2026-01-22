import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
    console.warn("NEXT_PUBLIC_API_BASE_URL is not set. Axios will use relative URLs.");
}

const api = axios.create({
    baseURL,
    timeout: 10000,
    headers: { Accept: "application/json" },
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
            // Handle unauthorized access if needed
        }
        return Promise.reject(error);
    }
);

export default api;
