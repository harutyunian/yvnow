import { Center, VStack, Skeleton } from "native-base";
import React from "react";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const width = screenWidth - screenWidth * 0.1;
const height = screenWidth / 2;

export default function SkeletonCard() {
  return (
    <Center w={width}>
      <VStack
        w="90%"
        maxW={width}
        space={1}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton h="40" />
        <Skeleton.Text px="4" />
      </VStack>
    </Center>
  );
}
