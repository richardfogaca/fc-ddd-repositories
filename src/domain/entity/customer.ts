import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("ID is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  isActive() {
    return this._active;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}