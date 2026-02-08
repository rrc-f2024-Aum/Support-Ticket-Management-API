import { Tickets, sampleTickets } from "../../../data/ticketData";

// health check
export const getHealthStatus = () => {
    return {
        status: "Ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    }
}
// Returns all the tickets.
export const getAllTickets = async (): Promise<Tickets[]> => {
    return sampleTickets;
}

// create ticket - title, description and priority
export const createNewTicket = async (ticketData: {
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "critical"
}): Promise<Tickets> => {

    const newTicket: Tickets = {
        id: sampleTickets.length > 0 ? Math.max(...sampleTickets.map(ticket => ticket.id)) + 1 : 1,
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        status: "open",
        createdAt: new Date().toISOString()
    };

    sampleTickets.push(newTicket);
    return newTicket;
}

// get ticket by ID 
export const getTicketById = async (id: number): Promise<Tickets | undefined> => {
    return sampleTickets.find(ticket => ticket.id === id);
}

// update ticket - priority and status
export const updateTicket = async (id: number,
    updateData: {
        title?: string,
        description?: string,
        priority?: "low" | "medium" | "high" | "critical",
        status?: "open" | "in-progress" | "resolved"
    }
): Promise<Tickets> => {
    const ticketIndex = sampleTickets.findIndex(ticket => ticket.id === id);



    const modifiedTicket: Tickets = {
        ...sampleTickets[ticketIndex],
        ...updateData,
        priority: updateData.priority || sampleTickets[ticketIndex].priority,
        status: updateData.status || sampleTickets[ticketIndex].status
    };

    sampleTickets[ticketIndex] = modifiedTicket;

    return modifiedTicket;
};

// delete ticket 
export const deleteTicket = async (id: number): Promise<boolean> => {
    const ticketIndex = sampleTickets.findIndex(ticket => ticket.id === id);

    if (ticketIndex === -1) {
        return false;
    }

    sampleTickets.splice(ticketIndex, 1)
    return true;
};

// Urgency calculation function
export const calculateTicketUrgency = (ticket: Tickets): {
    urgencyScore: number;
    urgencyLevel: string;
    ticketAge: number;
} => {

    const BASE_SCORES = {
        critical: 50,
        high: 30,
        medium: 20,
        low: 10
    };

    const ticketCreatedOn = new Date(ticket.createdAt);
    const now = new Date();
    const ticketAge = Math.floor((now.getTime() - ticketCreatedOn.getTime()) / (1000 * 60 * 60 * 24));

    const baseScore = BASE_SCORES[ticket.priority];
    const urgencyScore = baseScore + (ticketAge * 5);

    let urgencyLevel: string;

    if (ticket.status === "resolved") {
        urgencyLevel = "Minimal. Ticket resolved.";
    } else if (urgencyScore <= 29) {
        urgencyLevel = "Low Urgency. Address when capacity allows.";
    } else if (urgencyScore <= 54) {
        urgencyLevel = "Moderate. Schedule for attention.";
    } else if (urgencyScore <= 79) {
        urgencyLevel = "High Urgency. Prioritize soon.";
    } else {
        urgencyLevel = "Critical! Address immediately.";
    }

    return {
        ticketAge,
        urgencyScore,
        urgencyLevel  
    }
}