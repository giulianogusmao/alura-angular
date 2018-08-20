export class Notify {

  constructor(
    public readonly notifyType: NotifyType,
    public readonly message: string,
  ) {}

}

export enum NotifyType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO
}
