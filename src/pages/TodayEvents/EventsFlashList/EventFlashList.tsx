import { FlashList } from "@shopify/flash-list";
import { useCallback, useMemo } from "react";
import { Dimensions } from "react-native";
import { IEventCart } from "../../../types/event.type";
import EventCart from "../../../components/EventCard/EventCart";
import { useAppDispatch, useAppSelector } from "../../../hook/reduxHooks";
import { setLoader } from "../../../store/reducer/loading/loadingSlice";
import React from "react";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth - screenWidth * 0.1;
const height = screenWidth / 2;

interface IProps {
  fetchEvents: any;
}

function FlashListEvent({ fetchEvents }: IProps) {
  const query = useAppSelector((state) => state.query);
  const { events } = useAppSelector((state) => state.events);
  const { loadMore } = useAppSelector((state) => state.loader);
  const dispatch = useAppDispatch();

  const getItemLayout = useCallback((_, index: number) => {
    return { length: height, offset: height * index, index };
  }, []);

  const maxToRenderPerBatch = useMemo(() => 10, []);
  const windowSize = useMemo(() => 21, []);
  const initialNumToRender = useMemo(() => 10, []);
  const keyExtractor = useCallback(
    (item: IEventCart, index: number) => `${index}-${item.id}`,
    []
  );
  const renderItem = useCallback(
    ({ item }: { item: IEventCart }) => <EventCart event={item} />,
    []
  );

  const handleScroll = useCallback(async () => {
    if (loadMore) return;
    dispatch(setLoader({ val: true, name: "loadMore" }));
    await fetchEvents(query);
    dispatch(setLoader({ val: false, name: "loadMore" }));
  }, [loadMore, query]);

  return (
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
  );
}

const EventFlashList = React.memo(FlashListEvent, () => true);
export default EventFlashList;
