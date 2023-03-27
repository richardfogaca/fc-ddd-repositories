import { Product } from "../../../domain/entity/product";
import EventDispatcher from "../../../infrastructure/messaging/event-dispatcher";
import ProductCreatedEvent from "../../../infrastructure/messaging/events/product/product-created.event";

export default class CreateProductUseCase {
  private eventDispatcher: EventDispatcher;

  constructor(eventDispatcher: EventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  execute(id: string, name: string, price: number): Product {
    const product = new Product(id, name, price);
    const productCreatedEvent = new ProductCreatedEvent({ id, name, price });
    this.eventDispatcher.notify(productCreatedEvent);

    return product;
  }
}
