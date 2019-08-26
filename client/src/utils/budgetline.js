import axios from "axios";

export const getBudgetLine = (id) => {
    if (!id){
        const res = axios.get("/api/budgetline");
        return res;
    } else {
        const response = axios.get("/api/budgetline"+id);
        return response;
    }
}
export const postBudgetLine = (formData) => {
        const res = await axios.post("/api/budgetline", formData);
        return res;
}