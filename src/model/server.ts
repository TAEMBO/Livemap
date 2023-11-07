import { ServerTyping, SlotsTyping } from "../typings.js";

export function Server(server: ServerTyping) {
  this.name = server.name;
  this.version = server?.version || '0.0.0.0';
}

export function Slots(slots: SlotsTyping) {
  this.onlineCount = slots.used || '0';
  this.maxCount = slots.capacity || '0';
}