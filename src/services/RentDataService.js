import http from "./config.js";

class RentDataService{
    getAll(){
        return http.get("/rent");
    }


get(id) {
    return http.get(`/rent/${id}`);
}

create(data) {
    return http.post("/rent",data);
}

update(id,data) {
    return http.put(`/rent/${id}`,data);
}

delete(id){
    return http.delete(`/rent/${id}`);
    }
}

export default new RentDataService();