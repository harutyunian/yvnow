import HttpService from "../Http/HttpService";
import {FILTERS} from "../../constants/server";
import {IFilters} from "../../types/event.type";

export class FilterService {
    private readonly httpService;

    constructor() {
        this.httpService = new HttpService();
    }

    async getFilterLists():Promise<IFilters[]> {
        try {
            const url = FILTERS.GET_ALL
            return await this.httpService.get(url)
        } catch (e) {
            console.log('Something went wrong tying to get filter list', e)
            return Promise.reject(e)
        }

    }
}
