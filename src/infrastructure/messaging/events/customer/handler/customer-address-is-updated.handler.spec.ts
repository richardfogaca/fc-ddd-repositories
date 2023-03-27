import CustomerAddressIsUpdatedHandler from "./customer-address-is-updated.handler";
import AddressChangedEvent from "../address-changed.event";

describe('CustomerAddressIsUpdatedHandler unit tests', () => {
  let handler = new CustomerAddressIsUpdatedHandler();

  beforeEach(() => {
    handler = new CustomerAddressIsUpdatedHandler();
  });

  it('should handle CustomerAddressIsUpdatedHandler for the event AddressChangedEvent', () => {
    const event = new AddressChangedEvent({
      id: '1',
      name: 'Customer 1',
      address: 'Rua do Cliente 1',
    });
    const consoleLogSpy = jest.spyOn(console, 'log');
    handler.handle(event);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Endereço do cliente: 1, Customer 1 alterado para: Rua do Cliente 1');
    consoleLogSpy.mockRestore();
  });
});
