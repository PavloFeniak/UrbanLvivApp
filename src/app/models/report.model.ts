export class MyReport {
  get isDone(): boolean {
    return this._isDone;
  }

  set isDone(value: boolean) {
    this._isDone = value;
  }
  constructor(
    private _id: number,
    private _title: string,
    private _description: string,
    private _imageUrl: string,
    private _typeOfProblem: number,
    private _creatorId: number,
    private _location: string,
    private _timeOfCreation: string,
    private _priority: string,
    private _isDone: boolean
  ) {}


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  get typeOfProblem(): number {
    return this._typeOfProblem;
  }

  set typeOfProblem(value: number) {
    this._typeOfProblem = value;
  }

  get creatorId(): number {
    return this._creatorId;
  }

  set creatorId(value: number) {
    this._creatorId = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get timeOfCreation(): string {
    return this._timeOfCreation;
  }

  set timeOfCreation(value: string) {
    this._timeOfCreation = value;
  }

  get priority(): string {
    return this._priority;
  }

  set priority(value: string) {
    this._priority = value;
  }

}


