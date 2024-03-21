import HttpService from "../Http/HttpService";
import {EVENTS} from "../../constants/server";
import {IEventCart} from "../../types/event.type";
export class EventService {
    private readonly httpService;

    constructor() {
        this.httpService = new HttpService();
    }

    async toDaysEvents(page: number, limit: number = 10): Promise<{ events: IEventCart[], total: number }> {
        try {
            const url = EVENTS.TODAY;
            return await this.httpService.get<Promise<{ events: IEventCart[], total: number }>>(url, {
                params: {
                    currentTime: new Date().toISOString(),
                    page,
                    limit
                }
            });
        } catch (e) {
            console.log("Something went wrong trying to get today events", e);
            return Promise.reject(e);
        }
    }

    async getEventByUserId(userId: number): Promise<{ notStarted: IEventCart[], passed: IEventCart[] }> {
        try {
            const url = EVENTS.BY_USER_ID + userId;
            return await this.httpService.get(url);
        } catch (e) {
            console.log("Something went wrong trying to get events by user id", e);
            return Promise.reject(e);
        }
    }
}
