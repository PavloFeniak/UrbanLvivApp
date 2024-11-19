export class ReportAdminModel {
  get processingStatus(): number {
    return this._processingStatus;
  }

  set processingStatus(value: number) {
    this._processingStatus = value;
  }
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


  constructor(id: number, title: string, typeOfProblem: number, creatorId: number, location: string, timeOfCreation: string, priority: string, status: number) {
    this._id = id;
    this._title = title;
    this._typeOfProblem = typeOfProblem;
    this._creatorId = creatorId;
    this._location = location;
    this._timeOfCreation = timeOfCreation;
    this._priority = priority;
    this._processingStatus = status;
  }
  private _id: number;
  private _title: string;
  private _typeOfProblem: number;
  private _creatorId: number;
  private _location: string;
  private _timeOfCreation: string;
  private _priority: string;
  private _processingStatus: number;
}
