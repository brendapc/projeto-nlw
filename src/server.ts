import express from "express";
import './database'

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Olá NLW 5" });
});

app.listen(3333, () => console.log("Server is runnig on port 3333"));
