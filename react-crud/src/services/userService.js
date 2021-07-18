import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users?Id=${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  // findByFullName(title) {
  //   return http.get(`/users?title=${title}`);
  // }

  findByCountry(title) {
    if(title===""){
      return http.get(`/users`);
    }
    return http.get(`/users?Country=${title}`);
  }
}

export default new UserDataService();