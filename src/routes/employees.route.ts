import { Router } from "express";
import { EmployeeController } from "../controllers/employees.controller";

class EmployeeRoute {
  router = Router();
  controller: EmployeeController;
  constructor() {
    this.controller = new EmployeeController();
    this.setRoutes();
  }

  setRoutes() {
    this.router.get("/", this.controller.getEmployees);
    this.router.get("/oldest", this.controller.getOldest);
    this.router.get("/:name", this.controller.getEmployeesByName);
    this.router.post("/", this.controller.createEmployee);
  }
}
export default new EmployeeRoute().router;
