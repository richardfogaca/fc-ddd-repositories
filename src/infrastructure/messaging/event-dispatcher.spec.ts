import SendEmailWhenProductIsCreatedHandler from "./events/product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "./events/product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain event tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers.ProductCreatedEvent
          ).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
          eventDispatcher.getEventHandlers.ProductCreatedEvent
          ).toBeDefined();
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler);
        eventDispatcher.unregisterAll();

        expect(
          eventDispatcher.getEventHandlers.ProductCreatedEvent
          ).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const sendEmailEventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spySendEmailEventHandler = jest.spyOn(sendEmailEventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(sendEmailEventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
          name: "Product 1",
          description: "Product 1 description",
          price: 100,
        });

        // Quando o notify for executado, o sendEmailWhenProductIsCreatedHandler.handle() será executado
        eventDispatcher.notify(productCreatedEvent);
        expect(spySendEmailEventHandler).toHaveBeenCalled();
    });
});
