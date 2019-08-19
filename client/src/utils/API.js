import axios from "axios";

export default {

  getCategories: function () {
    return axios.get("/api/categories");
  },
  // Gets the book with the given id
  getCategories: function (id) {
    return axios.get("/api/categories/" + id);
  },
  // Deletes the book with the given id
  deleteCategories: function (id) {
    return axios.delete("/api/categories/" + id);
  },
  // Saves a book to the database
  saveCategories: function (categoryData) {
    return axios.post("/api/categories", categoryData);
  }

  updateCategories: function (categoryData) {
    return axios.put("/api/categories", categoryData);
  }

};
