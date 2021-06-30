import { AbstractMessage } from "./abstract.message";

export class AirToAirMessage extends AbstractMessage {
  constructor (
    public hexIdent: string,
    public altitude: number
  ) {
    super(hexIdent);
  }
}