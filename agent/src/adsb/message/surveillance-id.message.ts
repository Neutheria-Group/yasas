import { AbstractMessage } from "./abstract.message";

export class SurveillanceIdMessage extends AbstractMessage {

  constructor (
    public hexIdent: string,
    public squawk: string
  ) {
    super(hexIdent);
  }
}