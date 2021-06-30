import { AbstractMessage } from "./abstract.message";

export class SurfacePositionMessage extends AbstractMessage {
  constructor(
    public hexIdent: string,
    public altitude: number,
    public groundSpeed: number,
    public track: number,
    public latitude: number,
    public longitude: number
  ) {
    super(hexIdent);
  }
}