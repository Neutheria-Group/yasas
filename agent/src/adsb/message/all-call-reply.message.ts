import { AbstractMessage } from "./abstract.message";

export class AllCallReplyMessage extends AbstractMessage {
  constructor (
    public hexIdent: string
  ) {
    super(hexIdent);
  }
}