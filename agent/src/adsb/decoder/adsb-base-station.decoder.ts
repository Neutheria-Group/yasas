import { AdsbDecoder } from "./adsb-decoder";
import { Injectable } from "@nestjs/common";
import { IdentificationCategoryMessage } from "../message/identification-category.message";
import { SurfacePositionMessage } from "../message/surface-position.message";
import { AirbornePositionMessage } from "../message/airborne-position.message";
import { AirborneVelocityMessage } from "../message/airborne-velocity.message";
import { SurveillanceAltMessage } from "../message/surveillance-alt.message";
import { SurveillanceIdMessage } from "../message/surveillance-id.message";
import { AirToAirMessage } from "../message/air-to-air.message";
import { AllCallReplyMessage } from "../message/all-call-reply.message";
import { Message } from "../message/message";

const FIELDS = {
  TYPE: 1,
  HEXIDENT: 4,
  CALLSIGN: 10,
  ALTITUDE: 11,
  GROUND_SPEED: 12,
  TRACK: 13,
  LATITUDE: 14,
  LONGITUDE: 15,
  VERTICAL_RATE: 16,
  SQUAWK: 17
}

@Injectable()
export class AdsbBaseStationDecoder implements AdsbDecoder {
  async decode (buffer: Buffer): Promise<Message[]> {
    const payloads = buffer.toString('utf8')
      .trim()
      .split('\n')
      .map(payload => payload.trim());

    const messages = [];

    for (const payload of payloads) {
      const fields = payload.split(',');

      if (fields.length !== 22) continue;
      if (fields[0] !== 'MSG') continue;
      if (fields[FIELDS.HEXIDENT] === '000000') continue;

      switch (fields[FIELDS.TYPE]) {
      case '1':
        messages.push(new IdentificationCategoryMessage(
          fields[FIELDS.HEXIDENT],
          fields[FIELDS.CALLSIGN]
        ));
        break;
      case '2':
        messages.push(new SurfacePositionMessage(
          fields[FIELDS.HEXIDENT],
          parseInt(fields[FIELDS.ALTITUDE], 10),
          parseInt(fields[FIELDS.GROUND_SPEED], 10),
          parseInt(fields[FIELDS.TRACK], 10),
          parseFloat(fields[FIELDS.LATITUDE]),
          parseFloat(fields[FIELDS.LONGITUDE])
        ));
        break;
      case '3':
        messages.push(new AirbornePositionMessage(
          fields[FIELDS.HEXIDENT],
          parseInt(fields[FIELDS.ALTITUDE], 10),
          parseFloat(fields[FIELDS.LATITUDE]),
          parseFloat(fields[FIELDS.LONGITUDE])
        ));
        break;
      case '4':
        messages.push(new AirborneVelocityMessage(
          fields[FIELDS.HEXIDENT],
          parseInt(fields[FIELDS.GROUND_SPEED], 10),
          parseInt(fields[FIELDS.TRACK], 10),
          parseInt(fields[FIELDS.VERTICAL_RATE], 10)
        ));
        break;
      case '5':
        messages.push(new SurveillanceAltMessage(
          fields[FIELDS.HEXIDENT],
          parseInt(fields[FIELDS.ALTITUDE], 10)
        ));
        break;
      case '6':
        messages.push(new SurveillanceIdMessage(
          fields[FIELDS.HEXIDENT],
          fields[FIELDS.SQUAWK]
        ));
        break;
      case '7':
        messages.push(new AirToAirMessage(
          fields[FIELDS.HEXIDENT],
          parseInt(fields[FIELDS.ALTITUDE], 10)
        ));
        break;
      case '8':
        messages.push(new AllCallReplyMessage(
          fields[FIELDS.HEXIDENT]
        ));
        break;
      }
    }

    return messages;
  }
}