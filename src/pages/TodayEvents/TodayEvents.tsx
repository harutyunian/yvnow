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
import { FilterAction, TodayButtons } from "./switchButtons.enum";
import { FilterService } from "../../services/FilterService/FilterService";
import { setActiveFilters } from "../../store/reducer/filter/filterReducer";
import { EventService } from "../../services/EventService/EventService";
import { addNewEventLists } from "../../store/reducer/event/eventReducer";
import { setLoader } from "../../store/reducer/loading/loadingSlice";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth - screenWidth * 0.1;
const height = screenWidth / 2;

const initialQuery = {
  page: 1,
  limit: 6,
  filters: [],
  type: TodayButtons.all,
  bottomFilter: FilterAction.all,
};
function TodayEvents() {
  const [query, setQuery] = useState<IQuery>(initialQuery);
  const [errorMessage, setErrorMessage] = useState();

  const [isDataEmpty, setisDataEmpty] = useState(false);

  const { events } = useAppSelector((state) => state.events);
  const { loadMore, eventLoading } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInitialThemeMode(dispatch);
    setInitialLang(dispatch);
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    (async function () {
      try {
        if (!isMounted) return;
        dispatch(setLoader({ name: "eventLoading", val: true }));
        const filterService = new FilterService();
        const activeFilterList = await filterService.getActiveFilters();
        dispatch(setActiveFilters(activeFilterList));
        await getEvents(query);
        return activeFilterList;
      } catch (e: any) {
        setErrorMessage(e.message);
      } finally {
        dispatch(setLoader({ name: "eventLoading", val: false }));
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  async function getEvents(query: IQuery) {
    try {
      const eventService = new EventService();
      const { events } = await eventService.getEventsByFilter(query);
      dispatch(addNewEventLists(events));
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }
  const handleScroll = () => {
    if (loadMore) return;
    (async function () {
      dispatch(setLoader({ val: true, name: "loadMore" }));
      await getEvents(query);
      dispatch(setLoader({ val: false, name: "loadMore" }));
    })();
  };

  const renderItem = useCallback(function ({ item }: { item: IEventCart }) {
    return <EventCart event={item} />;
  }, []);

  const getItemLayout = useCallback((_: any, index: number) => {
    const screenWidth = Dimensions.get("window").width;
    const height = screenWidth / 2;
    return { length: height, offset: height * index, index };
  }, []);

  const initialNumToRender = useMemo(() => 10, []); // useMemo for optimization
  const keyExtractor = useCallback(
    (item: any, i: number) => `${i}-${item.id}`,
    []
  );
  const maxToRenderPerBatch = useMemo(() => 10, []); // useMemo for optimization
  const windowSize = useMemo(() => 21, []); // useMemo for optimization

  if (eventLoading)
    return (
      <View style={[todayEventsStyle.loading]}>
        <Loader />
      </View>
    );
  if (errorMessage) return <Text>{errorMessage}</Text>;

  return (
    <View style={[todayEventsStyle.container, { paddingBottom: height / 3 }]}>
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
          estimatedItemSize={events.length}
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
          style={{
            top: -30,
            width: 100,
            height: 50,
            backgroundColor: "transparent",
          }}
          source={require("./../../../assets/lottie/load_more.json")}
        />
      )}
      <BottomSheetFilters />
    </View>
  );
}

const todayEventsStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    display: "flex",
    marginTop: 2,
    rowGap: 5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  scrollViewContainer: {},
  scrollViewContent: {
    flex: 1,
  },
  button: {
    backgroundColor: "green",
    width: 90,
    height: 40,
  },
  buttonWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    columnGap: 5,
  },
  loading: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TodayEvents;
function emptyEventList(): any {
  throw new Error("Function not implemented.");
}
