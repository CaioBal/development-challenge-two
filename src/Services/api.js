import axios from "axios";

const api = axios.create({
    baseURL: "https://8klu71y1ld.execute-api.us-east-1.amazonaws.com",
    headers: {
        "Content-type": "application/json",
    }
});

export default api;