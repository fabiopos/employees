import { supertestInstance } from "..";
import { IEmployee } from "../types/IEmployee";
import { data } from "../data/employees";

describe("employees", () => {
  describe("get employees", () => {
    describe("given no qs", () => {
      it("should return all employees", async () => {
        const { status, body } = await supertestInstance.get("/api/employees");

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(6);
      });
    });
    describe("given a page number", () => {
      it("with page 1 => should return Sue and Bob", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?page=1"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(2);

        expect(employees[0].name).toBe("Sue");
        expect(employees[1].name).toBe("Bob");
      });

      it("with page 2 => should return Willy and John", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?page=2"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(2);

        expect(employees[0].name).toBe("Willy");
        expect(employees[1].name).toBe("John");
      });

      it("with page 3 => should return Steve and Martin", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?page=3"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(2);

        expect(employees[0].name).toBe("Steve");
        expect(employees[1].name).toBe("Martin");
      });
    });
    describe("given user query string", () => {
      it("with true => should return 4", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?user=true"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(4);
      });

      it("with false => should return 6", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?user=false"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(6);
      });
    });
    describe("given badges query string", () => {
      it("with black => should return 3 employees", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees?badges=black"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();

        const employees = body as IEmployee[];
        expect(employees.length).toBe(3);
      });
    });
    describe("given name in path param", () => {
      it("with Martin => should return 1 employee", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees/martin"
        );

        expect(status).toBe(200);
        expect(body instanceof Array).toBeTruthy();
        const employees = body as IEmployee[];
        expect(employees.length).toBe(1);

        expect(employees[0].name).toBe("Martin");
      });

      it("with Penelope => should return 404", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees/penelope"
        );

        expect(status).toBe(404);
        expect(body.code).toBe("not_found");
      });
    });
  });

  describe("get oldest employee", () => {
    describe("given happy scenario", () => {
      it("should return Martin", async () => {
        const { status, body } = await supertestInstance.get(
          "/api/employees/oldest"
        );

        expect(status).toBe(200);
        const employee = body as IEmployee;
        expect(employee.name).toBe("Martin");
      });
    });
  });

  describe("create new employee", () => {
    describe("given a valid employee", () => {
      it("should all employees +1", async () => {
        const allDataCount = data.length;
        const newEmployee = { name: "Juana", age: 19 };

        const { status, body } = await supertestInstance
          .post("/api/employees")
          .send(newEmployee);

        expect(status).toBe(200);
        const employees = body as IEmployee[];
        expect(employees.length).toBe(allDataCount + 1);
        expect(employees[allDataCount].name).toBe(newEmployee.name);
      });
    });
  });
});
