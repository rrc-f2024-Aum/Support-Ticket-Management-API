import request from "supertest";
import express from "express";
import ticketRoute from "../src/api/v1/routes/ticketRoute";
import * as ticketController from "../src/api/v1/controllers/ticketController";

jest.mock("../src/api/v1/controllers/ticketController");

const app = express();
app.use(express.json());
app.use("/api/v1", ticketRoute);

describe("Ticket Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
  
    // Test - GET All Tickets.
    it("should return all tickets.", async () => {
        (ticketController.displayAllTickets as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "OK", data: [] });
                await request(app).get("/api/v1/ticket");
                expect(ticketController.displayAllTickets).toHaveBeenCalled();
            },
        );
    });


    // Test - GET ticket by id.
    it("should return ticket by id.", async () => {
        (ticketController.displayTicketById as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "OK", data: {} });
                await request(app).get("/api/v1/ticket/2");
                expect(ticketController.displayAllTickets).toHaveBeenCalled();
            },
        );
    });

    //Test - Post create new ticket
    it("should create a new ticket.", async () => {
        (ticketController.generateTicket as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "Created", data: {} });
                await request(app).post("api/v1/ticket").send({
                    title: "New",
                    description: "creating new ticket",
                    priority: "medium",
                });
                expect(ticketController.generateTicket).toHaveBeenCalled();
            },
        );
    });


    // Test - Put update ticket details
    it("should update ticket details", async () => {
        (ticketController.updateTicketDetails as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "Updated", data: {} });
            });
            await request(app).put("/api/v1/tickets/1").send({
                priority: "high"
            });
            expect(ticketController.updateTicketDetails).toHaveBeenCalled();
    });
    
    // Test - Delete ticket
    it("should deleted ticket by id", async() => {
        (ticketController.removeTicket as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "Deleted"
                });
            });
            await request(app).delete("/api/v1/tickets/3");
            expect(ticketController.removeTicket).toHaveBeenCalled();
    })

    // Test - Get Urgency calculation
    it("should display ticket details with urgency calculations", async () =>{
        (ticketController.ticketUrgency as jest.Mock).mockImplementation(
            async (req, res) => {
                res.json({ message: "Ticket urgency calculated",
                    data: {}
                });
            });
            await request(app).get("/api/v1/tickets/2/urgency");
            expect(ticketController.ticketUrgency).toHaveBeenCalled();
    });
});
