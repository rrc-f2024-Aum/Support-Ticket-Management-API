import express, { Express } from "express";

const app: Express = express();

app.get("/", (req, res) =>{
    res.send("Assignment #2: Support Ticket Management API");
});

export default app;
