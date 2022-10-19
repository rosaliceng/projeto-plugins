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

    update(rent) {
        return http.put('rent/' + rent.id, rent);
    }

    delete(id) {
        return http.delete(`/Rent/${id}`);
    }
}

export default new RentDataService();