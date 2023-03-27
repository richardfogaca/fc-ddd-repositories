import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import CustomerCreatedEvent from "../../../infrastructure/messaging/events/customer/customer-created.event";
import ConsoleLog1Handler from "../../../infrastructure/messaging/events/customer/handler/console-log1.handler";
import ConsoleLog2Handler from "../../../infrastructure/messaging/events/customer/handler/console.log2.handler";


describe("Customer created event tests", () => {
    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const consoleLog1EventHandler = new ConsoleLog1Handler();
        const consoleLog2EventHandler = new ConsoleLog2Handler();
        const spyConsoleLog1EventHandler = jest.spyOn(consoleLog1EventHandler, "handle");
        const spyConsoleLog2EventHandler = jest.spyOn(consoleLog2EventHandler, "handle");
        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            email: "customer1@gmail.com",
        });

        eventDispatcher.register("CustomerCreatedEvent", consoleLog1EventHandler);
        eventDispatcher.register("CustomerCreatedEvent", consoleLog2EventHandler);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(consoleLog1EventHandler);
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(consoleLog2EventHandler);

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyConsoleLog1EventHandler).toHaveBeenCalled();
        expect(spyConsoleLog2EventHandler).toHaveBeenCalled();
      });
});
