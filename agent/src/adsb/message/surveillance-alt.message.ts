import { AbstractMessage } from "./abstract.message";

export class SurveillanceAltMessage extends AbstractMessage {
  constructor (
    public hexIdent: string,
    public altitude: number
  ) {
    super(hexIdent);
  }
}