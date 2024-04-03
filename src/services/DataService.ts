import http from "@/http-common";

/* eslint-disable */
class DataService {
  getAll(): Promise<any> {
    return http.get("/hotels");
  }

  get(id: any): Promise<any> {
    return http.get(`/hotels/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/hotels", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.patch(`/hotels/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/hotels/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/hotels`);
  }

  findByTitle(id: string): Promise<any> {
    return http.get(`/hotels?id=${id}`);
  }
}

export default new DataService();
