import { Request, Response } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";
import * as ticketService from "../services/ticketService";

// all tickets
export const displayAllTickets = async (req: Request, res: Response): Promise<void> => {
    const tickets = await ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).send({
        message: "Tickets Received.",
        data: tickets
    });
}

// create ticket
export const generateTicket = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority } = req.body;
    const addTicket = await ticketService.createNewTicket({
        title, description, priority
    });
    res.status(HTTP_STATUS.CREATED).json({message: "Ticket created successfully", 
        data: addTicket
    });
}

// ticket only by id
// update ticket details
// delete ticket
// calculate urgency 