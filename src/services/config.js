import axios from "axios";

export default axios.create({
baseURL: "http://localhost:5000/api/v1",
// baseURL: "https://librarywdarnsback.loca.lt/api/v1",
  headers: {
    "Content-type": "application/json"

  }
});