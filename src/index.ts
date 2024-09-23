import ExpressServer from "./server/expressServer";

const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.POR) || 3000;

const server = new ExpressServer(HOST, PORT);
//const employeeRoute = new EmployeeRoute(server);

try {
  // employeeRoute.setRoutes();
  
  server.listen();
} catch (e) {
  console.log(e);
  process.exit(1);
}
