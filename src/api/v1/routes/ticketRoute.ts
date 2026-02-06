import express, { Router } from "express";
import {
    getAllTickets,
    getTicketById,
    createNewTicket,
    //updateTicket,
    deleteTicket,
    calculateTicketUrgency
} from "../services/ticketService";

const router: Router = express.Router();

router.get('/tickets', getAllTickets);
router.get('/tickets/ :id', getTicketById);
router.post('/tickets', createNewTicket);
//router.put('/tickets/ :id', updateTicket);
router.delete('/tickets/ :id', deleteTicket);
router.get('/tickets/ :id/urgency', calculateTicketUrgency); 

export default router;