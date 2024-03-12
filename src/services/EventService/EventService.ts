import HttpService from "../Http/HttpService";
import { EVENTS } from "../../constants/server";
import { IEventCart } from "../../types/event.type";
import { Platform } from "react-native";

export class EventService {
  private readonly httpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async toDaysEvents(): Promise<IEventCart[]> {
    try {
      const url = EVENTS.TODAY;
      return await this.httpService.get(url);
    } catch (e) {
      console.log("Something went wrong trying to get today events", e);
      return Promise.reject(e);
    }
  }

  async getEventByUserId(userId: number):Promise<{notStarted:IEventCart[],passed:IEventCart[]}> {
    try {
      const url = EVENTS.BY_USER_ID + userId;
      return await this.httpService.get(url);
    } catch (e) {
      console.log("Something went wrong trying to get events by user id", e);
      return Promise.reject(e); 
    }
  }
}
