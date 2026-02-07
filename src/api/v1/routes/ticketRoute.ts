import express, { Router } from "express";
import {
    displayAllTickets,
    displayTicketById,
    generateTicket,
    updateTicketDetails,
    removeTicket,
    ticketUrgency
} from "../controllers/ticketController";

const router: Router = express.Router();

router.get('/tickets', displayAllTickets);
router.get('/tickets/:id', displayTicketById);
router.post('/tickets', generateTicket);
router.put('/tickets/:id', updateTicketDetails);
router.delete('/tickets/:id', removeTicket);
router.get('/tickets/:id/urgency', ticketUrgency); 

export default router;