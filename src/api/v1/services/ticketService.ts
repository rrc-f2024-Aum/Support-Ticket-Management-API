import { Tickets, sampleTickets } from "src/data/ticketData";

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

    if (!ticketData.title) {
        throw new Error("Missing required field: title")
    }

    if (!ticketData.description) {
        throw new Error("Missing required field: description")
    }

    if (!ticketData.priority) {
        throw new Error("Invalid priority. Must be one of: critical, high, medium, low")
    }

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
    return sampleTickets.find(ticket=> ticket.id === id);
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
        
        if (ticketIndex === -1) {
            throw new Error("Ticket not found")
        }
        
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