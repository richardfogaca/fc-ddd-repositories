import ConsoleLog2Handler from "./console.log2.handler";
import CustomerCreatedEvent from "../customer-created.event";

describe('ConsoleLog2Handler unit tests', () => {
  let handler = new ConsoleLog2Handler();

  beforeEach(() => {
    handler = new ConsoleLog2Handler();
  });

  it('should handle ConsoleLog2Handler for the event CustomerCreatedEvent', () => {
    const event = new CustomerCreatedEvent({
      name: 'Customer 2',
      email: 'customer2@email.com',
    });
    const consoleLogSpy = jest.spyOn(console, 'log');
    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Esse é o segundo console.log do evento: CustomerCreated');
    consoleLogSpy.mockRestore();
  });
});
