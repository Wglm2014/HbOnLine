import axios from "axios";

export const getBudgetLine = (id) => {
    if (!id) {
        const res = axios.get("/api/budgetline");
        return res;
    } else {
        const response = axios.get("/api/budgetline/" + id);
        return response;
    }
}
export const postBudgetLine = (formData) => {
    const res = axios.post("/api/budgetline", formData);
    return res;
}

export const putBudgetLine = (updateFormData) => {
    const res = axios.put("/api/budgetlineputdel", updateFormData);
    return res;
}

export const deleteBudgetLine = function (id) {
    // alert("before request" + id);

    const res = axios.delete("/api/budgetlineputdel/" + id);
    //alert(res);
    return res;
}