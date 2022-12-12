import ProductInterface from "./product.interface";
import NotificationError from "../../@shared/notification/notification.error";
import Notification from "../../@shared/notification/notification";
import ProductBValidatorFactory from "../factory/product-b.validator.factory";

export default class ProductB implements ProductInterface {
  public notification: Notification;

  protected _id: string;

  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this.notification = new Notification();

    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): void {
    ProductBValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
