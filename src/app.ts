import express, { Express } from "express";
import morgan from "morgan";
import ticketRoute from "./api/v1/routes/ticketRoute"

const app: Express = express();

app.use(express.json());
app.use(morgan('combined'));

app.use("/api/v1", ticketRoute);

export default app;
