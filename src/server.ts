import express, { request, response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "./database";
import { routes } from "./routes";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
  return response.render("html/client.html");
});

const http = createServer(app); // criando protocolo http
const io = new Server(http); // criando protocolo websocket

io.on("connection", (socket: Socket) => {
  console.log("Socket se conectou", socket.id);
});

app.use(express.json());

app.use(routes);

app.get("/", (request, response) => {
  return response.json({ message: "Olá NLW 5" });
});

http.listen(3333, () => console.log("Server is runnig on port 3333"));
