import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {Marker} from "react-native-maps";

export const ClusterMarker = ({count, coordinate}: any) => (
    <Marker
        tracksViewChanges={false}
        coordinate={coordinate}
    >
        <View style={style.container}>
            <View style={style.countWrapper}>
                <Text style={style.countText}>{count}</Text>
            </View>
        </View>
    </Marker>
);

const style = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(8,90,1,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    countWrapper: {
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: 'rgba(8,90,1,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText:{
        color: 'rgb(255,162,107)',
        fontSize: 18,
        fontWeight: '900',
    }
})