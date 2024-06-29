import React from "react";
import {Center, Skeleton, VStack} from "native-base";
import {Dimensions} from "react-native";



const screenWidth = Dimensions.get('window').width;
const width = screenWidth - (screenWidth * 0.1)

const EventCartSkeleton = React.memo(function () {
    return <Center w={'100%'}>
        <VStack w={width}  space={8} overflow="hidden" rounded="md" _dark={{
            borderColor: 'coolGray.500'
        }} _light={{
            borderColor: 'coolGray.200'
        }}>
            <Skeleton h="40"/>
            <Skeleton.Text px="4"/>
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100"/>
        </VStack>
    </Center>;
})

export default EventCartSkeleton
