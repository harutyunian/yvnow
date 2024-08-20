import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IFilters } from "../../types/event.type";
import { FilterTag } from "../FilterTag/FilterTag";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { useTranslation } from "../../hook/translationHook";
import ButtonStyled from "../Button/Button";
import { IColorScheme } from "../ButtomSheetFilters/ButtomSheetFilters";
import {
  setActionFilter,
  setSelectedFilterList,
} from "../../store/reducer/filter/filterReducer";
import { setQuery } from "../../store/reducer/query/querySlice";

export enum FilterAction {
  all = "all",
  today = "today",
  upcoming = "upcoming",
  live = "live",
}

export type FilterActionType =
  | FilterAction.live
  | FilterAction.upcoming
  | FilterAction.all
  | FilterAction.today;

interface IFilterActionsSheetProps {
  colorSchemeFilter: IColorScheme;
}

export function FilterActionsSheet(props: IFilterActionsSheetProps) {
  const { colorSchemeFilter } = props;
  const { lang } = useAppSelector((state) => state.translation);
  const colors = useAppSelector((state) => state.theme);
  const { bottomFilter } = useAppSelector((state) => state.filters);
  const { selectedFilters, unselectedFilters } = useAppSelector(
    (state) => state.filters
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handlePress = (isPressed: boolean, filter: IFilters) => {
    dispatch(
      setSelectedFilterList({
        filter,
        filterType: isPressed ? "remove" : "add",
      })
    );
  };

  const handleFilterChange = (action: FilterActionType) => {
    dispatch(
      setActionFilter({ filterType: "bottomFilter", actionType: action })
    );
    dispatch(setQuery({ bottomFilter: action }));
  };

  const isAllActive = useMemo(
    () => bottomFilter === FilterAction.all,
    [bottomFilter]
  );
  const isLiveActive = useMemo(
    () => bottomFilter === FilterAction.live,
    [bottomFilter]
  );
  const isUpcomingActive = useMemo(
    () => bottomFilter === FilterAction.upcoming,
    [bottomFilter]
  );
  const isTodayActive = useMemo(
    () => bottomFilter === FilterAction.today,
    [bottomFilter]
  );
  const renderFilterTag = useCallback(
    (
      filter: IFilters,
      isPressed: boolean // Memoized renderFilterTag
    ) => (
      <FilterTag
        isPressed={isPressed}
        onPress={handlePress}
        filter={filter}
        text={filter[lang]}
        key={filter.id}
      />
    ),
    [handlePress, lang]
  );

  return (
    <View style={[filterActionsSheetStyle.wrapper]}>
      <View style={[filterActionsSheetStyle.filterContainer]}>
        <ButtonStyled
          text={t("types.all")}
          textStyle={filterActionsSheetStyle.textStyle}
          onPress={() => handleFilterChange(FilterAction.all)}
          textColor={isAllActive ? "white" : colors.ACCENT["1"]}
          style={[
            filterActionsSheetStyle.button,
            {
              backgroundColor: isAllActive
                ? colorSchemeFilter.bnt_active
                : colorSchemeFilter.bnt_inactive,
            },
          ]}
        />
        <ButtonStyled
          text={t("live")}
          textStyle={filterActionsSheetStyle.textStyle}
          onPress={() => handleFilterChange(FilterAction.live)}
          textColor={isLiveActive ? "white" : colors.ACCENT["1"]}
          style={[
            filterActionsSheetStyle.button,
            {
              backgroundColor: isLiveActive
                ? colorSchemeFilter.bnt_active
                : colorSchemeFilter.bnt_inactive,
            },
          ]}
        />
        <ButtonStyled
          text={t("tabs.today")}
          textStyle={filterActionsSheetStyle.textStyle}
          onPress={() => handleFilterChange(FilterAction.today)}
          textColor={isTodayActive ? "white" : colors.ACCENT["1"]}
          style={[
            filterActionsSheetStyle.button,
            {
              backgroundColor: isTodayActive
                ? colorSchemeFilter.bnt_active
                : colorSchemeFilter.bnt_inactive,
            },
          ]}
        />
        <ButtonStyled
          text={t("upcoming")}
          textStyle={filterActionsSheetStyle.textStyle}
          onPress={() => handleFilterChange(FilterAction.upcoming)}
          textColor={isUpcomingActive ? "white" : colors.ACCENT["1"]}
          style={[
            filterActionsSheetStyle.button,
            {
              backgroundColor: isUpcomingActive
                ? colorSchemeFilter.bnt_active
                : colorSchemeFilter.bnt_inactive,
            },
          ]}
        />
      </View>
      <View style={[filterActionsSheetStyle.filterTagContainer]}>
        <ScrollView style={[filterActionsSheetStyle.scroll]} horizontal>
          {selectedFilters &&
            selectedFilters.map((filter) => renderFilterTag(filter, true))}
          {unselectedFilters &&
            unselectedFilters.map((filter) => renderFilterTag(filter, false))}
        </ScrollView>
      </View>
    </View>
  );
}

const filterActionsSheetStyle = StyleSheet.create({
  filterTagContainer: {
    height: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "500",
  },
  wrapper: {
    rowGap: 10,
    padding: 0,
  },
  scroll: {},
  filterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 85,
    height: 35,
  },
});
