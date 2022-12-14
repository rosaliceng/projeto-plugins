import http from "./config.js";

class BookDataService {
    getAll() {
        return http.get("/book");
    }


    get(id) {
        return http.get(`/book/${id}`);
    }

    listMaxRented() {
        return http.get("/book/MaxRented");
      }
    
    getAvailable() {
        return http.get("/book/ByAvailable");
    }

    create(data) {
        return http.post("/book", data);
    }

    update(id, data) {
        return http.put(`/book/${id}`, data);
    }

    delete(id) {
        return http.delete(`/book/${id}`);
    }
}

export default new BookDataService();