import HttpService from "../Http/HttpService";
import {EVENTS} from "../../constants/server";
import {IEventCart} from "../../types/event.type";
import {isBetweenDates, shuffleArray} from "../../helpers/helper";

export class EventService {
    private readonly httpService;

    constructor() {
        this.httpService = new HttpService();
    }

    async toDaysEvents(): Promise<IEventCart[]> {
        try {
            const url = EVENTS.TODAY;
            const result = await this.httpService.get(url, {
                params: {
                    currentTime: new Date().toISOString() // Pass current time as a query parameter
                }
            });
            // live events move to start and not live move to end with shuffle
            const events = Array.isArray(result) && result.reduce((acc, el) => {
                if (isBetweenDates(el.startDate, el.endDate)) acc.live.push(el)
                else acc.noLive.push(el)
                return acc
            }, {live: [], noLive: []})
            return [...shuffleArray<IEventCart>(events.live), ...shuffleArray<IEventCart>(events.noLive),]
        } catch (e) {
            console.log("Something went wrong trying to get today events", e);
            return Promise.reject(e);
        }
    }

    async getEventByUserId(userId: number): Promise<{ notStarted: IEventCart[], passed: IEventCart[] }> {
        try {
            const url = EVENTS.BY_USER_ID + userId;
            console.log(url)
            return await this.httpService.get(url);
        } catch (e) {
            console.log("Something went wrong trying to get events by user id", e);
            return Promise.reject(e);
        }
    }
}
