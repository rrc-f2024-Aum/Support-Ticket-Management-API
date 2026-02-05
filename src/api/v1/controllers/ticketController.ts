import { Request, Response } from "express";
import { HTTP_STATUS } from "src/constants/httpConstants";
import * as ticketService from "../services/ticketService";

export const displayAllTickets = async (req: Request, res: Response): Promise<void> => {
    const tickets = await ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).send({
        message: "Tickets Received.",
        data: tickets
    });
}