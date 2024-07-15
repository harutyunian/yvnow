import {TodayButtons} from "../pages/TodayEvents/switchButtons.enum";
import {FilterAction} from "../components/FiltersActionsSheet/FilterActionsSheet";

export type EventTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event
export type FilterActionType = FilterAction.live | FilterAction.upcoming | FilterAction.all | FilterAction.today
