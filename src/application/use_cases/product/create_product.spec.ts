import CreateProductUseCase from './create_product';
import EventDispatcher from '../../../infrastructure/messaging/event-dispatcher';
import ProductCreatedEvent from '../../../infrastructure/messaging/events/product/product-created.event';

describe('Create product use case', () => {
  let eventDispatcher: EventDispatcher;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    eventDispatcher = new EventDispatcher();
    createProductUseCase = new CreateProductUseCase(eventDispatcher);
  });

  it('should create a product with the provided data', () => {
    const id = '1';
    const name = 'Product 1';
    const price = 100;

    const product = createProductUseCase.execute(id, name, price);
    expect(product.id).toBe(id);
    expect(product.name).toBe(name);
    expect(product.price).toBe(price);
  });

  it('should dispatch a ProductCreatedEvent with the product data', () => {
    const id = '1';
    const name = 'Product 1';
    const price = 100;
    const productCreatedData = { id, name, price };

    const notifySpy = jest.spyOn(eventDispatcher, 'notify');
    createProductUseCase.execute(id, name, price);

    expect(notifySpy).toHaveBeenCalledTimes(1);
    const event = notifySpy.mock.calls[0][0];
    expect(event).toBeInstanceOf(ProductCreatedEvent);
    expect(event.eventData).toMatchObject(productCreatedData);
  });
});
