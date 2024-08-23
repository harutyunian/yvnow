import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import EventCart from "../../components/EventCard/EventCart";
import { IEventCart, IQuery } from "../../types/event.type";
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

const screenWidth = Dimensions.get("window").width;
const width = screenWidth - screenWidth * 0.1;
const height = screenWidth / 2;

function TodayEvents() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { events } = useAppSelector((state) => state.events);
  const query = useAppSelector((state) => state.query);
  const { loadMore, eventLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

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

  const handleScroll = useCallback(async () => {
    if (loadMore) return;
    dispatch(setLoader({ val: true, name: "loadMore" }));
    await fetchEvents(query);
    dispatch(setLoader({ val: false, name: "loadMore" }));
  }, [loadMore, query]);

  const renderItem = useCallback(
    ({ item }: { item: IEventCart }) => <EventCart event={item} />,
    []
  );

  const getItemLayout = useCallback((_, index: number) => {
    return { length: height, offset: height * index, index };
  }, []);

  const initialNumToRender = useMemo(() => 10, []);
  const keyExtractor = useCallback(
    (item: IEventCart, index: number) => `${index}-${item.id}`,
    []
  );
  const maxToRenderPerBatch = useMemo(() => 10, []);
  const windowSize = useMemo(() => 21, []);

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
          {!eventLoading && !events.length ? (
            <NoData />
          ) : (
            <FlashList
              {...{
                getItemLayout,
                initialNumToRender,
                maxToRenderPerBatch,
                windowSize,
              }}
              estimatedItemSize={height}
              estimatedListSize={{ height, width }}
              refreshing={loadMore}
              showsVerticalScrollIndicator={false}
              onEndReached={handleScroll}
              onEndReachedThreshold={1}
              scrollEventThrottle={16}
              data={events}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
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
