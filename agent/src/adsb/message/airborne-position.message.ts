import { AbstractMessage } from "./abstract.message";

export class AirbornePositionMessage extends AbstractMessage {
  constructor(
    public hexIdent: string,
    public altitude: number,
    public latitude: number,
    public longitude: number
  ) {
    super(hexIdent);
  }
}