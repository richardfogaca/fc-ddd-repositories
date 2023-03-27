import CreateCustomerUseCase from "./create_customer";
import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import CustomerCreatedEvent from "../../../infrastructure/messaging/events/customer/customer-created.event";

describe('Create customer use case', () => {
  let eventDispatcher: EventDispatcher;
  let createCustomerUseCase: CreateCustomerUseCase;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    createCustomerUseCase = new CreateCustomerUseCase(eventDispatcher);
  });

  it('should create a customer with the provided data', () => {
    const id = '1';
    const name = 'Customer 1';

    const customer = createCustomerUseCase.execute(id, name);
    expect(customer.id).toBe(id);
    expect(customer.name).toBe(name);
  });

  it('should dispatch a CustomerCreatedEvent with the customer data', () => {
    const id = '1';
    const name = 'Customer 1';
    const customerCreatedData = { id, name };

    const notifySpy = jest.spyOn(eventDispatcher, 'notify');
    createCustomerUseCase.execute(id, name);

    expect(notifySpy).toHaveBeenCalledTimes(1);
    const event = notifySpy.mock.calls[0][0];
    expect(event).toBeInstanceOf(CustomerCreatedEvent);
    expect(event.eventData).toMatchObject(customerCreatedData);
  });
});
