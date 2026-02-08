import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as ticketService from "../services/ticketService";

// health check
export const checkHealth = (req: Request, res: Response): void => {
    const healthData = ticketService.getHealthStatus();
    res.json(healthData);
};

// all tickets
export const displayAllTickets = async (req: Request, res: Response): Promise<void> => {
    const tickets = await ticketService.getAllTickets();
    res.status(HTTP_STATUS.OK).send({
        message: "Tickets retrieved",
        count: tickets.length,
        data: tickets
    });
}

// create ticket
export const generateTicket = async (req: Request, res: Response): Promise<void> => {
    const { title, description, priority } = req.body;

    const trimTitle = title?.trim();
    const trimDescription = description?.trim();

    if (!trimTitle || trimTitle === "" ) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title"
        });
        return;
    }

    if (!trimDescription || trimDescription === "") {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: description"
        });
        return;
    }

    if (!priority || !['critical', 'high', 'medium', 'low'].includes(priority)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
        return;
    }
    const addTicket = await ticketService.createNewTicket({
        title: trimTitle, description: trimDescription, priority
    });
    res.status(HTTP_STATUS.CREATED).json({
        message: "Ticket created successfully", 
        data: addTicket
    });
}

// ticket only by id
export const displayTicketById = async (req: Request, res: Response): Promise<void> => {
    const idParam = Number(req.params.id);
    const ticket = await ticketService.getTicketById(idParam);

    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({ message: "Ticket received successfully",
        data: ticket
    })
}

// update ticket details
export const updateTicketDetails = async (req: Request, res: Response): Promise<void> =>{
    const idParam = Number(req.params.id);
    if (isNaN(idParam)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid ticket id."
        });
        return;
    }

    const {title, description, priority, status} = req.body;

    if(priority !== undefined && !['critical', 'high', 'medium', 'low'].includes(priority)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
        return;
    }

    if(status !== undefined && !['open', 'in-progress', 'resolved'].includes(status)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved"
        });
        return;
    }

    const updatedTicket = await ticketService.updateTicket(idParam, {
        title,
        description,
        priority,
        status
    });

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket updated successfully",
        data: updatedTicket
    });

}

// delete ticket
export const removeTicket = async (req: Request, res: Response): Promise<void> => {
    const idParam = Number(req.params.id);
    const isDeleted = await ticketService.deleteTicket(idParam);

    if(!isDeleted) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found"
        });
        return;
    }

    res.status(HTTP_STATUS.OK).json({
        message: "Ticket deleted successfully"
    });

}

// calculate urgency 
export const ticketUrgency = async (req: Request, res: Response): Promise<void> => {
    const idParam = Number(req.params.id);
    const ticket = await ticketService.getTicketById(idParam);

    if(!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Ticket not found"
        });
        return;
    }

    const data = ticketService.calculateTicketUrgency(ticket);

    res.status(HTTP_STATUS.OK).json({
        message: "Urgency calculated successfully",
        data : {
            id: ticket.id,
            title: ticket.title,
            priority: ticket.priority,
            status: ticket.status,
            createdAt: ticket.createdAt,
            ...data
        }
    });
    
}

