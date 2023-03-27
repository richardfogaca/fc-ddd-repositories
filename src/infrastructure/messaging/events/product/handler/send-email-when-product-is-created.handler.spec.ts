import SendEmailWhenProductIsCreatedHandler from "./send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product-created.event";

describe('Send email when Product is created unit tests', () => {
  let handler = new SendEmailWhenProductIsCreatedHandler();

  beforeEach(() => {
    handler = new SendEmailWhenProductIsCreatedHandler();
  });

  it('should handle the ProductCreatedEvent', () => {
    const event = new ProductCreatedEvent({
      id: 1,
      name: 'Product 1',
      price: 100,
    });
    const consoleLogSpy = jest.spyOn(console, 'log');
    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Send email to .....');
    consoleLogSpy.mockRestore();
  });
});
