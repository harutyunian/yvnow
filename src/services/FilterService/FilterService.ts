import {IEventCart, IFilters,} from "../../types/event.type";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import _ from "lodash";
import {FilterActionType, TodayTabs} from "../../types/filter.type";
import {FilterAction} from "../../components/FiltersActionsSheet/FilterActionsSheet";
import {
    isBetweenDates,
    isDateGreaterThanEndOfDay,
    isIncludedToday,
    removeDuplicatesByValues
} from "../../helpers/helper";

export class FilterService {


    static topFilter(events: IEventCart[], mainFilter: TodayTabs) {
        if (mainFilter === TodayButtons.all) {
            return events
        }
        return _.filter(events, ({type}) => _.toLower(type) === _.toLower(mainFilter))
    }


    static bottomFilteredEvents(topFilteredEvents: IEventCart[], bottomFilter: FilterActionType) {
        let eventLists = topFilteredEvents
        if (bottomFilter === FilterAction.live) {
            eventLists = _.filter(topFilteredEvents, event => {
                const {startDate, endDate} = event;
                return isBetweenDates(startDate, endDate);
            });
        } else if (bottomFilter === FilterAction.upcoming) {
            eventLists = _.filter(topFilteredEvents, event => {
                const {startDate} = event;
                return isDateGreaterThanEndOfDay(startDate);
            });
        }
        else if (bottomFilter === FilterAction.today) {
            eventLists = _.filter(topFilteredEvents, event => {
                const {startDate} = event;
                return isIncludedToday(startDate);
            });
        }
        const filters = _.flatMap(eventLists, event => event.filters || []);
        // removing duplicates for staying filters which included event
        const uniqFilters = removeDuplicatesByValues<IFilters>(filters, 'id')
        return {eventLists, uniqFilters}
    }



    static subFilter(bottomFilteredEvents: IEventCart[], filtersList: IFilters[]) {
        if (_.isEmpty(filtersList)) {
            return bottomFilteredEvents;
        }
        return bottomFilteredEvents.filter(({filters}) => {
            return filters.some(filter => _.isEqual(_.find(filtersList, {'id': filter.id}), filter));
        });
    }
}
