import { Customer } from "../../../domain/entity/customer";
import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import CustomerCreatedEvent from "../../../infrastructure/messaging/events/customer/customer-created.event";

export default class CreateCustomerUseCase {
  private eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  execute(id: string, name: string): Customer {
    const customer = new Customer(id, name);
    const customerCreatedEvent = new CustomerCreatedEvent({ id, name });
    this.eventDispatcher.notify(customerCreatedEvent);

    return customer;
  }
}
