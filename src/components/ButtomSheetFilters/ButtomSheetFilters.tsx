import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet, { BottomSheetHandle } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonStyled from "../Button/Button";
import { TodayButtons } from "../../pages/TodayEvents/switchButtons.enum";
import { FilterActionsSheet } from "../FiltersActionsSheet/FilterActionsSheet";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { useTranslation } from "../../hook/translationHook";
import { EventTabs } from "../../types/filter.type";
import { colorSchemeDark, colorSchemeLight } from "./colorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  resetFilters,
  setActionFilter,
} from "../../store/reducer/filter/filterReducer";
import { resetQuery, setQuery } from "../../store/reducer/query/querySlice";
import { IQuery } from "../../types/event.type";
import { EventService } from "../../services/EventService/EventService";
import {
  addEventByFilter,
  emptyEventList,
} from "../../store/reducer/event/eventReducer";
import { setLoader } from "../../store/reducer/loading/loadingSlice";
import { setUserList } from "../../store/reducer/user/user";
import { initialQuery } from "../../constants/query";

export interface IColorScheme {
  bnt_active: string;
  bnt_inactive: string;
  buttonsBackground: string;
  background: string;
  bottomSheetBackground: string;
  indicatorColor: string;
  filtersBackground: string;
}

export interface IDisable {
  showEventsDisable: boolean;
  resetFilterDisable: boolean;
}
export const disabledButtons = {
  showEventsDisable: true,
  resetFilterDisable: true,
};
export const endabledButtons = {
  showEventsDisable: false,
  resetFilterDisable: false,
};

const BottomSheetFilters = React.memo(function () {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();

  // show events and reset filters buttons
  const [disabledActionButtons, setDisabledActionButtons] =
    useState<IDisable>(disabledButtons);
  const colors = useAppSelector((state) => state.theme);
  const { eventLoading } = useAppSelector((state) => state.loader);
  const { topFilter, selectedFilters } = useAppSelector(
    (state) => state.filters
  );
  const query = useAppSelector((state) => state.query);

  const dispatch = useAppDispatch();

  function handleChangeEventTabs(type: EventTabs) {
    setDisabledActionButtons(endabledButtons);
    dispatch(setActionFilter({ filterType: "topFilter", actionType: type }));
    dispatch(setQuery({ type }));
  }

  const isFiltersOpenedFirstTime = async () => {
    try {
      const isOpened = await AsyncStorage.getItem("bottomSheet");
      bottomSheetRef?.current?.expand();
      setTimeout(() => {
        if (isOpened === "true") bottomSheetRef.current?.collapse();
      }, 1000);
      await AsyncStorage.setItem("bottomSheet", "true");
    } catch (e) {}
  };

  const getEventList = useCallback(
    async (query: IQuery) => {
      if (eventLoading) return;
      try {
        dispatch(emptyEventList());
        dispatch(setLoader({ name: "eventLoading", val: true }));
        const eventService = new EventService();
        const result = await eventService.getEventsByFilter({
          ...query,
          page: 1,
        });
        dispatch(addEventByFilter(result.events));
        dispatch(setUserList(result.users));

        dispatch(setLoader({ name: "eventLoading", val: false }));
      } catch (e) {
        // console.log(e);
      }
    },
    [query]
  );

  const onShowEvent = () => {
    const filters = selectedFilters.length
      ? selectedFilters.map(({ id }) => id)
      : [];
    dispatch(setQuery({ ...initialQuery, filters }));
    getEventList({ ...initialQuery, filters });
    setDisabledActionButtons({
      showEventsDisable: true,
      resetFilterDisable: false,
    });
  };
  const onResetFilters = async () => {
    dispatch(resetFilters());
    dispatch(resetQuery());
    setDisabledActionButtons(disabledButtons);
    await getEventList({ ...query, filters: [] });
  };

  useEffect(() => {
    isFiltersOpenedFirstTime();
  }, []);

  // colors for bottom sheet
  const colorSchemeFilter = useMemo<IColorScheme>(() => {
    return colors.mode === "DARK" ? colorSchemeDark : colorSchemeLight;
  }, [colors, dispatch]);

  const initialSnapPoints = useMemo(() => [60, 230], []);
  const isAllActive = topFilter === TodayButtons.all;
  const isEventActive = topFilter === TodayButtons.event;
  const isShowActive = topFilter === TodayButtons.show;
  const isConcertActive = topFilter === TodayButtons.concert;

  return (
    <BottomSheet
      index={1}
      animateOnMount
      snapPoints={initialSnapPoints}
      handleComponent={BottomSheetHandle}
      ref={bottomSheetRef}
      backgroundStyle={{
        backgroundColor: colorSchemeFilter.bottomSheetBackground,
      }}
      handleStyle={[
        bottomSheetFilter.bottomSheetHeaderStyle,
        {
          backgroundColor: colorSchemeFilter.bottomSheetBackground,
          borderTopColor: colorSchemeFilter.bottomSheetBackground,
          borderLeftColor: colorSchemeFilter.bottomSheetBackground,
          borderRightColor: colorSchemeFilter.bottomSheetBackground,
        },
      ]}
      handleIndicatorStyle={{
        backgroundColor: colorSchemeFilter.indicatorColor,
      }}
    >
      <View
        style={[
          bottomSheetFilter.contentContainer,
          { backgroundColor: colorSchemeFilter.bottomSheetBackground },
        ]}
      >
        <Text
          style={{
            color: colors.ACCENT["1"],
            fontSize: 18,
            left: 8,
            bottom: 5,
            fontWeight: "500",
          }}
        >
          {t("filters.select_options")}
        </Text>
        <View
          style={[
            { backgroundColor: colorSchemeFilter.filtersBackground },
            bottomSheetFilter.buttonBackground,
          ]}
        >
          <View style={[bottomSheetFilter.buttonWrapper]}>
            <ButtonStyled
              text={t("types.all")}
              textStyle={bottomSheetFilter.textStyle}
              onPress={() => handleChangeEventTabs(TodayButtons.all)}
              textColor={isAllActive ? "white" : colors.ACCENT["1"]}
              style={[
                bottomSheetFilter.button,
                {
                  backgroundColor: isAllActive
                    ? colorSchemeFilter.bnt_active
                    : colorSchemeFilter.bnt_inactive,
                },
              ]}
            />
            <ButtonStyled
              text={t("types.event")}
              textStyle={bottomSheetFilter.textStyle}
              textColor={isEventActive ? "white" : colors.ACCENT["1"]}
              onPress={() => handleChangeEventTabs(TodayButtons.event)}
              style={[
                bottomSheetFilter.button,
                {
                  backgroundColor: isEventActive
                    ? colorSchemeFilter.bnt_active
                    : colorSchemeFilter.bnt_inactive,
                },
              ]}
            />
            <ButtonStyled
              text={t("types.show")}
              textStyle={bottomSheetFilter.textStyle}
              textColor={isShowActive ? "white" : colors.ACCENT["1"]}
              onPress={() => handleChangeEventTabs(TodayButtons.show)}
              style={[
                bottomSheetFilter.button,
                {
                  backgroundColor: isShowActive
                    ? colorSchemeFilter.bnt_active
                    : colorSchemeFilter.bnt_inactive,
                },
              ]}
            />
            <ButtonStyled
              text={t("types.concert")}
              textStyle={bottomSheetFilter.textStyle}
              textColor={isConcertActive ? "white" : colors.ACCENT["1"]}
              onPress={() => handleChangeEventTabs(TodayButtons.concert)}
              style={[
                bottomSheetFilter.button,
                {
                  backgroundColor: isConcertActive
                    ? colorSchemeFilter.bnt_active
                    : colorSchemeFilter.bnt_inactive,
                },
              ]}
            />
          </View>
          <FilterActionsSheet
            {...{
              setDisabledActionButtons,
              colorSchemeFilter,
            }}
          />
          <View style={bottomSheetFilter.actionButtonsWrapper}>
            <TouchableOpacity
              disabled={disabledActionButtons.resetFilterDisable}
              style={[
                { backgroundColor: colorSchemeFilter.bnt_active },
                bottomSheetFilter.resetButton,
              ]}
              onPress={onResetFilters}
            >
              <Text style={bottomSheetFilter.buttonText}>
                {t("filters.reset")}
              </Text>
              <MaterialCommunityIcons
                name="filter-remove"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={disabledActionButtons?.showEventsDisable}
              onPress={onShowEvent}
              style={[
                bottomSheetFilter.fetchEvents,
                { backgroundColor: colors.PRIMARY.SECOND },
              ]}
            >
              <Text style={bottomSheetFilter.buttonText}>
                {t("buttonSheet.showEvents")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheet>
  );
});

const bottomSheetFilter = StyleSheet.create({
  buttonBackground: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    columnGap: 20,
    rowGap: 10,
    padding: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  fetchEvents: {
    width: "45%",
    height: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    borderRadius: 10,
  },
  actionButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  resetButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "45%",
    borderRadius: 10,
    minHeight: 38,
  },
  bottomSheetHeaderStyle: {
    paddingVertical: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderStyle: "solid",
    borderWidth: 5,
    borderBottomColor: "transparent",
  },

  container: {
    flex: 1,
    display: "flex",
    marginTop: 2,
    rowGap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  textStyle: {
    fontSize: 12,
    fontWeight: "500",
  },
  button: {
    width: 85,
    height: 35,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 0,
  },
  buttonWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
});
export default BottomSheetFilters;
