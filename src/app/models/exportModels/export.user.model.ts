export class ExportUserModel{
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _number: string;
  private _password: string;




  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get number(): string {
    return this._number;
  }

  set number(value: string) {
    this._number = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  constructor(firstName: string, lastName: string, email: string, number: string, password: string) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._number = number;
    this._password = password;
  }
}
