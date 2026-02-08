import * as ticketService from '../src/api/v1/services/ticketService';

jest.mock("../src/data/ticketData.ts", () => ({
    sampleTickets: []
}));

describe("Ticket Service Urgency calculation", () => {
    beforeEach(() =>{
        jest.clearAllMocks();
    });

    // Test 1 - Low Urgency
    describe("calculateTicketUrgency for low urgency", () => {
        it("should return 'Low Urgency' for score 20 ", () =>{
            
            // Arrange
            const mockTicket = {
                id: 2,
                title: "Low Ticket",
                description: "testing ",
                priority: "low" as const,
                status: "open" as const,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            };

            // Act
            const result = ticketService.calculateTicketUrgency(mockTicket);

            //Assert
            expect(result.urgencyLevel).toBe("Low Urgency. Address when capacity allows.");
            expect(result.urgencyScore).toBe(20);
            expect(result.ticketAge).toBe(2);
        });
    });

    // Test 2 - Moderate Urgency
    describe("calculateTicketUrgency for Moderate urgency", () => {
        it("should return 'Moderate urgency' for score 30 ", () =>{
            
            // Arrange
            const mockTicket = {
                id: 2,
                title: "Moderate Ticket",
                description: "testing ",
                priority: "medium" as const,
                status: "open" as const,
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            };

            // Act
            const result = ticketService.calculateTicketUrgency(mockTicket);

            //Assert
            expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
            expect(result.urgencyScore).toBe(30);
            expect(result.ticketAge).toBe(2);
        });
    });
    // Test 3 - High Urgency
    describe("calculateTicketUrgency for High urgency", () => {
        it("should return 'High Urgency' for score 55 ", () =>{
            
            // Arrange
            const mockTicket = {
                id: 2,
                title: "Moderate Ticket",
                description: "testing ",
                priority: "high" as const,
                status: "open" as const,
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
            };

            // Act
            const result = ticketService.calculateTicketUrgency(mockTicket);

            //Assert
            expect(result.urgencyLevel).toBe("High Urgency. Prioritize soon.");
            expect(result.urgencyScore).toBe(55);
            expect(result.ticketAge).toBe(5);
        });
    });
    // Test 4 - Resolved Ticket
    describe("calculateTicketUrgency for resolved ticket", () => {
        it("should return 'Minimal. Ticket resolved' for resolved tickets ", () =>{
            
            // Arrange
            const mockTicket = {
                id: 1,
                title: "Resolved ticket",
                description: "testing ",
                priority: "high" as const,
                status: "resolved" as const,
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
            };

            // Act
            const result = ticketService.calculateTicketUrgency(mockTicket);

            //Assert
            expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");
            expect(result.urgencyScore).toBeGreaterThan(0);
            expect(result.ticketAge).toBe(10);
        });
    });
});