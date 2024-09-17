import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { IQuery } from "../../types/event.type";
import { Loader } from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hook/reduxHooks";
import { NoData } from "../../components/NoData/NoData";
import BottomSheetFilters from "../../components/ButtomSheetFilters/ButtomSheetFilters";
import { setInitialLang } from "../../store/reducer/theme/actions";
import { setInitialThemeMode } from "../../store/reducer/translation/action";
import { FilterService } from "../../services/FilterService/FilterService";
import { setActiveFilters } from "../../store/reducer/filter/filterReducer";
import { EventService } from "../../services/EventService/EventService";
import { addNewEventLists } from "../../store/reducer/event/eventReducer";
import { setLoader } from "../../store/reducer/loading/loadingSlice";
import { setUserList } from "../../store/reducer/user/user";
import { setQuery } from "../../store/reducer/query/querySlice";
import EventFlashList from "./EventsFlashList/EventFlashList";

const screenWidth = Dimensions.get("window").width;
const height = screenWidth / 2;

function TodayEvents() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const query = useAppSelector((state) => state.query);
  const { loadMore, eventLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();
  const { events } = useAppSelector((state) => state.events);

  useEffect(() => {
    setInitialThemeMode(dispatch);
    setInitialLang(dispatch);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;

    (async () => {
      try {
        if (!isMounted) return;
        dispatch(setLoader({ name: "eventLoading", val: true }));
        const filterService = new FilterService();
        const activeFilterList = await filterService.getActiveFilters();
        dispatch(setActiveFilters(activeFilterList));
        await fetchEvents(query);
        dispatch(setLoader({ name: "eventLoading", val: false }));
        dispatch(setLoader({ name: "firstFetchDone", val: true }));
      } catch (e: any) {
        setErrorMessage(e.message);
      }
    })();
  }, []);

  const fetchEvents = useCallback(async (query: IQuery) => {
    try {
      const eventService = new EventService();
      const { events, users } = await eventService.getEventsByFilter(query);
      dispatch(addNewEventLists(events));
      dispatch(setUserList(users));
      dispatch(setQuery({ page: query.page + 1 }));
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }, []);

  if (errorMessage) return <Text>{errorMessage}</Text>;

  return (
    <>
      {eventLoading && (
        <View style={styles.loading}>
          <Loader />
        </View>
      )}
      {!eventLoading && (
        <View style={[styles.container, { paddingBottom: height / 3 }]}>
          {events.length === 0 ? (
            <NoData />
          ) : (
            <EventFlashList {...{ fetchEvents }} />
          )}
          {loadMore && (
            <LottieView
              autoPlay
              style={styles.loaderAnimation}
              source={require("./../../../assets/lottie/load_more.json")}
            />
          )}
        </View>
      )}
      <BottomSheetFilters />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    marginTop: 2,
    rowGap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  loading: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderAnimation: {
    top: -30,
    width: 100,
    height: 50,
    backgroundColor: "transparent",
  },
});

export default TodayEvents;
