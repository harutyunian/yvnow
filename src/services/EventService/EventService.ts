import HttpService from "../Http/HttpService";
import { EVENTS } from "../../constants/server";
import { IEventCart, IFilters, IQuery, IUser } from "../../types/event.type";
import dayjs from "dayjs";

export class EventService {
  private readonly httpService;

  constructor() {
    this.httpService = new HttpService();
  }

  async toDaysEvents(
    page: number = 1,
    limit: number = 5
  ): Promise<{
    events: IEventCart[];
    total: number;
    uniqFilters: IFilters[];
  }> {
    try {
      const url = EVENTS.TODAY;
      return await this.httpService.get<
        Promise<{
          events: IEventCart[];
          total: number;
          uniqFilters: IFilters[];
        }>
      >(url, {
        params: {
          currentTime: dayjs().toISOString(),
          page,
          limit,
        },
      });
    } catch (e) {
      // console.log("Something went wrong trying to get today events", e);
      return Promise.reject(e);
    }
  }

  async getEventByUserId(
    userId: number
  ): Promise<{ notStarted: IEventCart[]; passed: IEventCart[] }> {
    try {
      const url = `${EVENTS.BY_USER_ID}${userId}/${dayjs().toISOString()}`;
      return await this.httpService.get(url);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async addView(eventId: number) {
    try {
      const url = EVENTS.INCREMENT_View;
      return await this.httpService.post(url, { id: eventId });
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async getEventsByFilter(
    query: IQuery
  ): Promise<{ events: IEventCart[]; users: IUser[]; total: number }> {
    try {
      const url = EVENTS.GET_EVENT_LIST_BY_QUERY;
      return await this.httpService.get(url, {
        params: {
          ...query,
          type: query.type.toLowerCase(),
          bottomFilter: query.bottomFilter.toLowerCase(),
          current: dayjs().toISOString(),
          filters: JSON.stringify(query.filters),
        },
      });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
