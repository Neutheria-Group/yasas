import { AbstractMessage } from "./abstract.message";

export class IdentificationCategoryMessage extends AbstractMessage {
  constructor(
    public hexIdent: string,
    public callsign: string
  ) {
    super(hexIdent);
  }
}