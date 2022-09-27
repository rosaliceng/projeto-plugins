import http from "./config.js";

class RentDataService {
    getAll() {
        return http.get("/Rent");
    }


    get(id) {
        return http.get(`/Rent/${id}`);
    }

    create(data) {
        return http.post("/Rent", data);
    }

    update(id, data) {
        return http.put(`/Rent/${id}`, data);
    }

    delete(id) {
        return http.delete(`/Rent/${id}`);
    }
}

export default new RentDataService();