import {TodayButtons} from "../pages/TodayEvents/switchButtons.enum";
import {FilterAction} from "../components/FiltersActionsSheet/FilterActionsSheet";

export type TodayTabs = TodayButtons.all | TodayButtons.concert | TodayButtons.show | TodayButtons.event
export type c = FilterAction.live | FilterAction.upcoming | FilterAction.all | FilterAction.today
