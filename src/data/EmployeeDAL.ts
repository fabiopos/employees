import { IEmployee } from "../types/IEmployee";
import { data } from "./employees";

export class EmployeeDAL {
  employees: IEmployee[];
  pageSize: number = 2;
  constructor() {
    this.employees = data as IEmployee[];
  }

  getAllEmployees() {
    return this.employees;
  }

  getAllEmployeesPaginated(pageNumber: number = 1, employees: IEmployee[]) {
    return this.paginate(pageNumber, employees);
  }

  getOldestEmployee() {
    const sortedEmployees = this.sortEmployeesByAge().reverse();
    return sortedEmployees[0];
  }

  filterByUserRole() {
    return this.employees.filter((x) => x.privileges === "user");
  }
  filterByBadge(badge: string) {
    return this.employees.filter((x) => x.badges.includes(badge));
  }

  sortEmployeesByAge() {
    return this.employees.sort((a, b) => a.age - b.age);
  }

  addEmployee(employee: IEmployee) {
    this.employees.push(employee);
    return this.employees;
  }

  filterByName(name: string) {
    return this.employees.filter((x) =>
      x.name.toUpperCase().includes(name.toUpperCase())
    );
  }

  private paginate(pageNumber: number, employees: IEmployee[]) {
    const from = this.pageSize * (pageNumber - 1);
    const to = from + 2;
    return employees.slice(from, to);
  }
}
