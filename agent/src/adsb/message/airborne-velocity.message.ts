import { AbstractMessage } from "./abstract.message";

export class AirborneVelocityMessage extends AbstractMessage {
  constructor(
    public hexIdent: string,
    public groundSpeed: number,
    public track: number,
    public verticalRate: number
  ) {
    super(hexIdent);
  }
}