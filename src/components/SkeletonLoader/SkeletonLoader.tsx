import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import { ScrollView } from "react-native-gesture-handler";

interface ISkeletonLoaderProps {
  count: number;
}
export default function SkeletonLoader(props: ISkeletonLoaderProps) {
  const { count = 5 } = props;

  const skeletonsArrByCount = useMemo(() => {
    return Array.from({ length: count }, (_, index) => index + 1);
  }, []);

  return (
    <View style={skeletonLoaderStyle.container}>
      {skeletonsArrByCount.map((el) => {
        return <SkeletonCard key={el} />;
      })}
    </View>
  );
}

const skeletonLoaderStyle = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    rowGap: 20,
  },
});
