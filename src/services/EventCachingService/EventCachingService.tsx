//This service we are using for catching events cart
// each time we are running in all array and filtering again and again
// for avoiding this affect I wrote this service
// You can change if you're thinking we can up performance


import {IEventCart, IFilters} from "../../types/event.type";
import {FilterActionType, EventTabs} from "../../types/filter.type";
import {FilterService} from "../FilterService/FilterService";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterAction} from "../../components/FiltersActionsSheet/FilterActionsSheet";

export class EventCachingService {
    private events: Map<any, any>;
    private topFilter: EventTabs;
    private bottomFilter: FilterActionType;


    constructor(events: IEventCart[]) {
        this.events = new Map()
        this.events.set(TodayButtons.all, this.createNodeMap().set(FilterAction.all, events))
        this.topFilter = TodayButtons.all
        this.bottomFilter = FilterAction.all
    }

    // Invalidate cache if necessary based on your data update logic
    public invalidateCache() {
        this.events.clear();
        this.topFilter = TodayButtons.all;
        this.bottomFilter = FilterAction.all;
    }

    // After adding new events we are making new array to start this catching process new
    // Because if we're trying to add in catch it will be a bad performance
    addNewData(data: IEventCart[]) {
        let event: IEventCart[] = []
        if (this.events.has(TodayButtons.all) && this.events.get(TodayButtons.all).has(FilterAction.all)) {
            event = Array.from(this.events.get(TodayButtons.all).get(FilterAction.all))
        }
        return new EventCachingService([...event, ...data])
    }

    topFilterCatch(topFilteredEvents: IEventCart[], mainFilter: EventTabs) {
        this.topFilter = mainFilter
        const hasData = this.events.has(mainFilter) && this.events.get(mainFilter).has(this.bottomFilter)
        if (hasData) return this.events.get(mainFilter).get(this.bottomFilter)
        const filteredList = FilterService.topFilter(topFilteredEvents, mainFilter)
        this.addList(filteredList)
        return this.getFilteredEvents()
    }

    bottomFilterCatch(topFilteredEvents: IEventCart[], bottomFilter: FilterActionType) {
        this.bottomFilter = bottomFilter
        const hasData = this.events.has(this.topFilter) && this.events.get(bottomFilter).has(this.bottomFilter)
        if (hasData) return this.events.get(this.topFilter).get(bottomFilter)
        const {eventLists} = FilterService.bottomFilteredEvents(topFilteredEvents, bottomFilter)
        // TODO: Should be returned also uniq values of filter
        this.addList(eventLists)
        return this.getFilteredEvents()
    }

    subFilterCatch(bottomFilteredEvents: IEventCart[], filtersList: IFilters[]) {
        // TODO: when we passing events sub filter we need to store it on service because as a argument we have a different reference
        if (filtersList.length === 0) return this.bottomFilterCatch(bottomFilteredEvents, this.bottomFilter)
        let eventList: IEventCart[] = []
        for (const filter of filtersList) {
            //immediately skip loop
            if (this.getBySubFilter(filter).size) {
                eventList.push(...this.getBySubFilter(filter))
            } else this.addSubFilter(bottomFilteredEvents, filter)
        }
        return eventList
    }


    private getBySubFilter(filter: IFilters) {
        const hasEvent = this.events.get(this.topFilter).get(this.bottomFilter).has(filter);
        if (hasEvent) return this.events.get(this.topFilter).get(this.bottomFilter).get(filter);
        return []
    }

    private addSubFilter(events: IEventCart[], filter: IFilters) {
        return this.events.get(this.topFilter).get(this.bottomFilter).set(this.createNodeMap().set(filter, events))
    }

    private createNodeMap() {
        return new Map()
    }

    private getFilteredEvents() {
        return this.events.get(this.topFilter).get(this.bottomFilter)
    }

    private addList(filteredEvent: IEventCart[]) {
        this.events.set(this.topFilter, this.createNodeMap().set(this.bottomFilter, filteredEvent))
    }
}
