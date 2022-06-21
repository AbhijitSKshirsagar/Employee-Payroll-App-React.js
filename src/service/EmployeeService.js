import axios from "axios";

class EmployeeService {
  baseUrl = "http://localhost:8088/employee_payroll";

  addEmployee(data) {
    return axios.post(`${this.baseUrl +"/create"}`, data);
  }
  getAllEmployees() {
    return axios.get(`${this.baseUrl + "/get"}`);
  }
  deleteEmployee = (employeeId) => {
   return axios.delete(`${this.baseUrl}/delete/${employeeId}`);
  };
  updateEmployee = (employeeId, data) => {
    console.log(employeeId);
    return axios.put(`${this.baseUrl}/update/${employeeId}`, data);
  };
  getById = (employeeId) => {
   return axios.get(`${this.baseUrl}/${employeeId}`);
  };
}
export default new EmployeeService();