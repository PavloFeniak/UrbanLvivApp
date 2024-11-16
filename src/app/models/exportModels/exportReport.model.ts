export class ExportReportModel {

  constructor(
    private _title: string,
    private _description: string,
    private _imageUrl: string,
    private _typeOfProblem: number,
    private _creatorId: number,
    private _location: string,
  ) {}





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

}


