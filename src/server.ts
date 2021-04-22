import express from "express";
import "./database";
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.get("/", (request, response) => {
  return response.json({ message: "Olá NLW 5" });
});

app.listen(3333, () => console.log("Server is runnig on port 3333"));
