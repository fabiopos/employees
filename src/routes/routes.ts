import { Application } from "express";
import employeeRoutes from "./employees.route";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/employees", employeeRoutes);
  }
}
