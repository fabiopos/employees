import supertest from "supertest";
import ExpressServer from "./server/expressServer";

const HOST: string = process.env.HOST || "localhost";
const PORT: number = Number(process.env.PORT) || 3000;

const server = new ExpressServer(HOST, PORT);
export const supertestInstance = supertest(server.getExpress())
try {
  server.listen();
} catch (e) {
  console.log(e);
  process.exit(1);
}
