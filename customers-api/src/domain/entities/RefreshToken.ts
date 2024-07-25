import { Customer } from './Customer';

/**
 * Interface representing the structure of a refresh token.
 *
 * @interface
 */
export interface IRefreshToken {
  expires_in: number;
  customer_id: string;
  customer: Customer;
  createdAt: Date;
}

/**
 * Class representing a refresh token.
 *
 * @class
 */
export class RefreshToken {
  private _expires_in: number;
  private _customer_id: string;
  private _customer: Customer;
  private _createdAt: Date;

  /**
   * Gets the expiration time of the refresh token.
   *
   * @readonly
   */
  get expires_in(): number {
    return this._expires_in;
  }

  /**
   * Gets the customer ID associated with the refresh token.
   *
   * @readonly
   */
  get customer_id(): string {
    return this._customer_id;
  }

  /**
   * Gets the customer associated with the refresh token.
   *
   * @readonly
   */
  get customer(): Customer {
    return this._customer;
  }

  /**
   * Gets the creation date of the refresh token.
   *
   * @readonly
   */
  get createdAt(): Date {
    return this._createdAt;
  }

  /**
   * Creates an instance of RefreshToken.
   *
   * @constructor
   * @param {IRefreshToken} props - The properties of the refresh token.
   */
  constructor(props: IRefreshToken) {
    this._expires_in = props.expires_in;
    this._customer_id = props.customer_id;
    this._createdAt = props.createdAt;
    this._customer = props.customer;
  }
}
