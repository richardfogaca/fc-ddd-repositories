import { Customer } from "../../../domain/entity/customer";
import { Address } from "../../../domain/entity/address";
import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import AddressChangedEvent from "../../../infrastructure/messaging/events/customer/address-changed.event";
import ChangeAddressUseCase from "./change_address";

describe("Change customer address unit tests", () => {
  let eventDispatcher: EventDispatcher;
  let changeAddressUseCase: ChangeAddressUseCase;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    changeAddressUseCase = new ChangeAddressUseCase(eventDispatcher);
  });

  it("should change the customer address", () => {
    const id = "1";
    const name = "Customer 1";
    const customer = new Customer(id, name);

    const address = new Address("Street 1", 123, "City 1", "1031456");
    changeAddressUseCase.execute(customer, address);

    expect(customer.Address).toEqual(address);
  });

  it("should notify the address changed event", () => {
    const id = "1";
    const name = "Customer 1";
    const customer = new Customer(id, name);
    const notifySpy = jest.spyOn(eventDispatcher, "notify");

    const address = new Address("Street 1", 123, "City 1", "1031456");
    changeAddressUseCase.execute(customer, address);

    expect(notifySpy).toHaveBeenCalledTimes(1);
    const event = notifySpy.mock.calls[0][0];
    expect(event).toBeInstanceOf(AddressChangedEvent);
    expect(event.eventData).toMatchObject({
      id: customer.id,
      address: customer.Address,
    })
  });
});
