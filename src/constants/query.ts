import {
  TodayButtons,
  FilterAction,
} from "../pages/TodayEvents/switchButtons.enum";

export const initialQuery = {
  limit: 6,
  page: 1,
  type: TodayButtons.all,
  filters: [],
  bottomFilter: FilterAction.all,
};
