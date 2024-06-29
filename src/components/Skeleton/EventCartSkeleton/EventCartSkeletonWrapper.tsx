import React from "react";
import EventCartSkeleton from "./EventCartSkeleton";
import {StyleSheet, View} from "react-native";


interface IEventCartSkeletonWrapperProps{
    count: number
}
const EventCartSkeletonWrapper = React.memo(function (props:IEventCartSkeletonWrapperProps) {
    const {count = 1} = props;

    const countArray = Array.from({ length: count }, (_, i) => i + 1);

    return <View style={[styles.container]}>{countArray.map((_,index)=><EventCartSkeleton key={index}/>)}</View>
})

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        rowGap: 30
    }
})
export default EventCartSkeletonWrapper
