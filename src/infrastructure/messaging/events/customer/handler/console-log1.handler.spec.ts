import ConsoleLog1Handler from "./console-log1.handler";
import CustomerCreatedEvent from "../customer-created.event";

describe('ConsoleLog1Handler unit tests', () => {
  let handler = new ConsoleLog1Handler();

  beforeEach(() => {
    handler = new ConsoleLog1Handler();
  });

  it('should handle ConsoleLog1Handler for the event CustomerCreatedEvent', () => {
    const event = new CustomerCreatedEvent({
      name: 'Customer 1',
      email: 'customer1@email.com',
    });
    const consoleLogSpy = jest.spyOn(console, 'log');
    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
    consoleLogSpy.mockRestore();
  });
});
