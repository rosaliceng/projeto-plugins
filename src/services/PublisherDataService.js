import http from "./config.js";

class PublisherDataService{
    getAll(){
        return http.get("/publisher");
    }


get(id) {
    return http.get(`/publisher/${id}`);
}

create(data) {
    return http.post("/publisher",data);
}

update(id,data) {
    return http.put(`/publisher/${id}`,data);
}

delete(id){
    return http.delete(`/publisher/${id}`);
    }
}

export default new PublisherDataService();