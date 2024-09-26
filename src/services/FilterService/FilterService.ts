import { IEventCart, IFilters } from "../../types/event.type";
import { TodayButtons } from "../../pages/TodayEvents/switchButtons.enum";
import _ from "lodash";
import { FilterActionType, EventTabs } from "../../types/filter.type";
import { FilterAction } from "../../components/FiltersActionsSheet/FilterActionsSheet";
import {
  isBetweenDates,
  isDateGreaterThanEndOfDay,
  isIncludedToday,
  removeDuplicatesByValues,
} from "../../helpers/helper";
import HttpService from "../Http/HttpService";
import { EVENTS } from "../../constants/server";

export class FilterService {
  http: HttpService;

  constructor() {
    this.http = new HttpService();
  }
  static topFilter(events: IEventCart[], mainFilter: EventTabs) {
    if (mainFilter === TodayButtons.all) {
      return events;
    }
    return _.filter(
      events,
      ({ type }) => _.toLower(type) === _.toLower(mainFilter)
    );
  }

  static bottomFilteredEvents(
    topFilteredEvents: IEventCart[],
    bottomFilter: FilterActionType
  ) {
    let eventLists = topFilteredEvents;
    if (bottomFilter === FilterAction.live) {
      eventLists = _.filter(topFilteredEvents, (event) => {
        const { startDate, endDate } = event;
        return isBetweenDates(startDate, endDate);
      });
    } else if (bottomFilter === FilterAction.upcoming) {
      eventLists = _.filter(topFilteredEvents, (event) => {
        const { startDate } = event;
        return isDateGreaterThanEndOfDay(startDate);
      });
    } else if (bottomFilter === FilterAction.today) {
      eventLists = _.filter(topFilteredEvents, (event) => {
        const { startDate } = event;
        return isIncludedToday(startDate);
      });
    }
    const filters = eventLists.map((event) => event.filters).flat();

    return { eventLists, filters };
  }

  static subFilter(
    bottomFilteredEvents: IEventCart[],
    filtersList: IFilters[]
  ) {
    if (_.isEmpty(filtersList)) {
      return bottomFilteredEvents;
    }
    const events = bottomFilteredEvents.filter(({ filters }) => {
      return filters.some((filter) =>
        _.isEqual(_.find(filtersList, { id: filter.id }), filter)
      );
    });
    return removeDuplicatesByValues(events, "id");
  }

  async getActiveFilters(): Promise<IFilters[]> {
    try {
      const currentTime = new Date().toISOString();
      const url = EVENTS.GET_ACTIVE_EVENTS;
      return await this.http.get(url, { params: { currentTime } });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
