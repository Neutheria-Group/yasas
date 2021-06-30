import { Message } from "./message";

export class AbstractMessage implements Message {
  public hexIdent: string;

  constructor (hexIdent: string) {
    this.hexIdent = hexIdent;
  }
}