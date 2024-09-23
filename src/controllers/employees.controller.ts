import { Request, Response } from "express";
import { IQueryEmployee } from "./IQueryEmployee";
import { EmployeeDAL } from "../data/EmployeeDAL";
import { IEmployee } from "../types/IEmployee";

export class EmployeeController {
  repository: EmployeeDAL;
  constructor() {
    this.repository = new EmployeeDAL();
  }
  getEmployees = (
    req: Request<never, never, never, IQueryEmployee>,
    res: Response
  ) => {
    const { badges, page, user } = req.query;

    let employees: IEmployee[] = this.repository.getAllEmployees();

    if (user === "true") {
      employees = this.repository.filterByUserRole();
    }
    if (badges !== undefined) {
      employees = this.repository.filterByBadge(badges);
    }

    // use case 1
    if (page === undefined) {
      return res.status(200).json(employees);
    }

    const paginated = this.repository.getAllEmployeesPaginated(page, employees);
    return res.status(200).json(paginated);
  };

  getOldest = (
    req: Request<never, never, never, IQueryEmployee>,
    res: Response
  ) => {
    const oldest = this.repository.getOldestEmployee();
    return res.status(200).json(oldest);
  };

  createEmployee = (
    req: Request<never, never, IEmployee, IQueryEmployee>,
    res: Response
  ) => {
    const employee = req.body;

    if (!employee)
      return res
        .status(400)
        .send({ message: "You must send a valid employee" });

    if (!employee.name)
      return res
        .status(400)
        .send({ message: "You must send a valid name for employee" });

    if (!employee.age)
      return res
        .status(400)
        .send({ message: "You must send a valid age for employee" });

    const result = this.repository.addEmployee(employee);
    return res.status(200).json(result);
  };

  getEmployeesByName = (
    req: Request<never, never, never, IQueryEmployee>,
    res: Response
  ) => {
    const { name } = req.params;
    const result = this.repository.filterByName(name);
    return res.status(200).json(result);
  };
}
