import React, {useEffect, useMemo, useRef} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {
    BottomSheetHandle,
} from "@gorhom/bottom-sheet";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import ButtonStyled from "../Button/Button";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterActionsSheet} from "../FiltersActionsSheet/FilterActionsSheet";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import {EventTabs} from "../../types/filter.type";
import {colorSchemeDark, colorSchemeLight} from "./colorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {resetAllFilters, setActionFilter} from "../../store/reducer/filter/filterReducer";


export interface IColorScheme {
    bnt_active: string,
    bnt_inactive: string,
    buttonsBackground: string,
    background: string,
    bottomSheetBackground: string,
    indicatorColor: string,
    filtersBackground: string
}


const BottomSheetFilters = React.memo(function () {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {t} = useTranslation()

    const {subFilteredEvents} = useAppSelector(state => state.events)
    const colors = useAppSelector(state => state.theme)
    const {topFilter} = useAppSelector(state => state.filters)
    const dispatch = useAppDispatch();


    function handleChangeEventTabs(type: EventTabs) {
        return function () {
            dispatch(setActionFilter({
                actionType: type,
                filterType: 'topFilter',
            }))
        }
    }

    const isFiltersOpenedFirstTime = async () => {
        try {
            const isOpened = await AsyncStorage.getItem('bottomSheet');
            setTimeout(() => {
                if (isOpened !== 'true') return bottomSheetRef?.current?.expand()
                bottomSheetRef.current?.collapse()
            }, 1000)
            await AsyncStorage.setItem('bottomSheet', 'true')
        } catch (e) {
        }
    }
    useEffect(() => {
        isFiltersOpenedFirstTime()
    }, []);

    // colors for bottom sheet
    const colorSchemeFilter = useMemo<IColorScheme>(() => {
        return colors.mode === 'DARK' ? colorSchemeDark : colorSchemeLight
    }, [colors, dispatch])


    const handleResetFilters = () => dispatch(resetAllFilters())
    const initialSnapPoints = useMemo(() => [60, 226], []);

    const isAllActive = useMemo(() => topFilter === TodayButtons.all, [topFilter])
    const isEventActive = useMemo(() => topFilter === TodayButtons.event, [topFilter])
    const isShowActive = useMemo(() => topFilter === TodayButtons.show, [topFilter])
    const isConcertActive = useMemo(() => topFilter === TodayButtons.concert, [topFilter])

    return <BottomSheet
        index={1}
        animateOnMount
        //@ts-ignore
        snapPoints={initialSnapPoints}
        handleComponent={BottomSheetHandle}
        ref={bottomSheetRef}
        backgroundStyle={{
            backgroundColor: colorSchemeFilter.bottomSheetBackground,
        }}
        handleStyle={[bottomSheetFilter.bottomSheetHeaderStyle, {
            backgroundColor: colorSchemeFilter.bottomSheetBackground,
            borderTopColor: colorSchemeFilter.bottomSheetBackground,
            borderLeftColor: colorSchemeFilter.bottomSheetBackground,
            borderRightColor: colorSchemeFilter.bottomSheetBackground,
        }]}
        handleIndicatorStyle={{
            backgroundColor: colorSchemeFilter.indicatorColor
        }}
    >
        <View
            style={
                [bottomSheetFilter.contentContainer,
                    {backgroundColor: colorSchemeFilter.bottomSheetBackground}
                ]}>
            <Text style={{
                color: colors.ACCENT["1"],
                fontSize: 18,
                left: 8,
                bottom: 5,
                fontWeight: '500'
            }}>{t('filters.select_options')}</Text>
            <View style={[{backgroundColor: colorSchemeFilter.filtersBackground}, bottomSheetFilter.buttonBackground]}>
                <View style={[bottomSheetFilter.buttonWrapper]}>
                    <ButtonStyled
                        text={t('types.all')}
                        textStyle={bottomSheetFilter.textStyle}
                        onPress={handleChangeEventTabs(TodayButtons.all)}
                        textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                        style={[bottomSheetFilter.button, {
                            backgroundColor: isAllActive ?
                                colorSchemeFilter.bnt_active :
                                colorSchemeFilter.bnt_inactive,
                        }]}
                    />
                    <ButtonStyled
                        text={t('types.event')}
                        textStyle={bottomSheetFilter.textStyle}
                        textColor={isEventActive ? "white" : colors.ACCENT["1"]}
                        onPress={handleChangeEventTabs(TodayButtons.event)}
                        style={[bottomSheetFilter.button, {
                            backgroundColor: isEventActive ?
                                colorSchemeFilter.bnt_active :
                                colorSchemeFilter.bnt_inactive,
                        }]}
                    />
                    <ButtonStyled
                        text={t('types.show')}
                        textStyle={bottomSheetFilter.textStyle}
                        textColor={isShowActive ? "white" : colors.ACCENT["1"]}
                        onPress={handleChangeEventTabs(TodayButtons.show)}
                        style={[bottomSheetFilter.button, {
                            backgroundColor: isShowActive ?
                                colorSchemeFilter.bnt_active :
                                colorSchemeFilter.bnt_inactive,
                        }]}
                    />
                    <ButtonStyled
                        text={t('types.concert')}
                        textStyle={bottomSheetFilter.textStyle}
                        textColor={isConcertActive ? "white" : colors.ACCENT["1"]}
                        onPress={handleChangeEventTabs(TodayButtons.concert)}
                        style={[bottomSheetFilter.button, {
                            backgroundColor: isConcertActive ?
                                colorSchemeFilter.bnt_active :
                                colorSchemeFilter.bnt_inactive,
                        }]}
                    />
                </View>
                <FilterActionsSheet  {...{subFilteredEvents, colorSchemeFilter}} />
                <TouchableOpacity
                    style={[bottomSheetFilter.resetButton, {backgroundColor: colorSchemeFilter.bnt_active}]}
                    onPress={handleResetFilters}
                >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '800'}}>{t('filters.reset')}</Text>
                    <MaterialCommunityIcons name="filter-remove" size={20} color="white"/>
                </TouchableOpacity>
            </View>
        </View>
    </BottomSheet>
})


const bottomSheetFilter = StyleSheet.create({
    buttonBackground: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        columnGap: 20,
        rowGap: 10,
        padding: 8,
        borderRadius: 10
    },
    bottomSheetHeaderStyle: {
        paddingVertical: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderStyle: 'solid',
        borderWidth: 5,
        borderBottomColor: 'transparent',
    },
    resetButton: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: "center",
        borderRadius: 10,
        height: 38
    },
    container: {
        flex: 1,
        display: "flex",
        marginTop: 2,
        rowGap: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%",
    },
    textStyle: {
        fontSize: 12,
        fontWeight: '500'
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
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10
    },
});
export default BottomSheetFilters
