import axios from "axios";

export const getMovements = (id) => {
    if (!id) {
        const res = axios.get("/api/movements");
        return res;
    } else {
        const response = axios.get("/api/movements/" + id);
        return response;
    }
}
export const postMovements = (formData) => {
    const res = axios.post("/api/movements", formData);
    return res;
}

export const deleteMovements = id => {
    const res = axios.delete("/api/movements/" + id);
    return res;
}