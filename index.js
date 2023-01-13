import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config.js";
import indexRouter from "./routes/index.js";
import taskRouter from "./routes/tasks.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

let __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);
console.log(process.env.DB_NAME);
console.log(process.env.DB_PORT);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(indexRouter);
app.use(taskRouter);
app.listen(process.env.PORT || 3000);
console.log("Server in port: " + PORT);
