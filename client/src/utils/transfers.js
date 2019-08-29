import axios from "axios";

export const getTransfers = (id) => {
    if (!id) {
        const res = axios.get("/api/transfers");
        return res;
    } else {
        const response = axios.get("/api/transfers", id);
        return response;
    }
}
export const postTransfers = (formData) => {
    const res = axios.post("/api/transfers", formData);
    return res;
}