import { Customer } from "../../../domain/entity/customer";
import { Address } from "../../../domain/entity/address";
import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import AddressChangedEvent from "../../../infrastructure/messaging/events/customer/address-changed.event";

export default class ChangeAddressUseCase {
  private eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  execute(customer: Customer, address: Address): void {
    customer.Address = address;
    const addressChangedEvent = new AddressChangedEvent({
      id: customer.id,
      address: customer.Address,
    });
    this.eventDispatcher.notify(addressChangedEvent);
  }
}