import { HttpClient } from "./httpClient";

export class TaskRepository {
  endPoint = "tasks";
  httpClient = new HttpClient("https://2966e7f6fec89ed2.mokky.dev");
  
  getTasks = () => {
    return this.httpClient.get(this.endPoint);
  };
  
  addTask = (data) => {
    return this.httpClient.post(this.endPoint, data);
  };
  
  deleteTask = (id) => {
    return this.httpClient.delete(this.endPoint, id);
  };
  
  patchTask = (data, id) => {
    return this.httpClient.patch(this.endPoint, data, id);
  };
}

export const taskRepository = new TaskRepository();
