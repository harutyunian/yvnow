import React, {useEffect, useMemo, useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import ButtonStyled from "../Button/Button";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterAction, FilterActionsSheet, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {useAppDispatch, useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import {TodayTabs} from "../../types/filter.type";
import {IFilters} from "../../types/event.type";
import {colorSchemeDark, colorSchemeLight} from "./colorScheme";


interface IBottomSheetFiltersProps {
    topFilter: TodayTabs,
    setTopFilter: React.Dispatch<React.SetStateAction<TodayTabs>>,
    setBottomFilter: React.Dispatch<React.SetStateAction<FilterActionType>>;
    setSubFilter: React.Dispatch<React.SetStateAction<IFilters[]>>
}

export interface IColorScheme {
    bnt_active: string,
    bnt_inactive: string,
    buttonsBackground: string,
    background: string,
    bottomSheetBackground: string,
    indicatorColor: string,
    filtersBackground: string
}


const BottomSheetFilters = React.memo(function (props: IBottomSheetFiltersProps) {
    const {topFilter, setTopFilter, setBottomFilter, setSubFilter} = props

    const dipatch = useAppDispatch()
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {t} = useTranslation()

    const colors = useAppSelector(state => state.theme)

    const filters = useAppSelector(state => state.filters)

    const [selectedFilters, setSelectedFilter] = useState<IFilters[]>(filters || [])
    const [unselectedFilters, setUnselectedFilter] = useState<IFilters[]>([])
    const [filterAction, setFilterActions] = useState<FilterActionType>(FilterAction.all)

    const handleChangeEventTabs = (type: TodayTabs) => setTopFilter(type)


    useEffect(() => {
        setTimeout(() => {
            bottomSheetRef.current?.expand()
        }, 1000)

    }, []);

    // colors for bottom sheet
    const colorSchemeFilter = useMemo<IColorScheme>(() => {
        if (colors.mode === 'DARK') return {...colorSchemeDark,
            bnt_active: colors.PRIMARY.MAIN,
            bnt_inactive: colors.ACCENT['6']
        }
        else return {...colorSchemeLight,
            bnt_inactive: colors.ACCENT['6'],
            bnt_active: colors.PRIMARY.MAIN,

        }
    }, [colors, dipatch])


    const handleResetFilters = () => {
        setSelectedFilter(filters)
        setUnselectedFilter([])
        setSubFilter([]);
        handleChangeEventTabs(TodayButtons.all)
        setFilterActions(FilterAction.all)
    }

    const isAllActive = useMemo(() => topFilter === TodayButtons.all, [topFilter])
    const isEventActive = useMemo(() => topFilter === TodayButtons.event, [topFilter])
    const isShowActive = useMemo(() => topFilter === TodayButtons.show, [topFilter])
    const isConcertActive = useMemo(() => topFilter === TodayButtons.concert, [topFilter])

    return <BottomSheet
        snapPoints={["7.5%", "30"]}
        index={-1}
        ref={bottomSheetRef}
        handleStyle={[bottomSheetFilter.bottomSheetHeaderStyle, {
            backgroundColor: colorSchemeFilter.bottomSheetBackground,
            borderTopColor: colorSchemeFilter.bottomSheetBackground,
            borderLeftColor: colorSchemeFilter.bottomSheetBackground,
            borderRightColor: colorSchemeFilter.bottomSheetBackground,
        }]}
        handleIndicatorStyle={{backgroundColor: colorSchemeFilter.indicatorColor}}
    >
        <BottomSheetView
            style={[bottomSheetFilter.contentContainer,
                {
                    backgroundColor: colorSchemeFilter.bottomSheetBackground,
                }
            ]}>
            <Text style={{
                color: colors.ACCENT["1"],
                fontSize: 18,
                left: 8,
                bottom: 5,
                fontWeight: '500'
            }}>Select options</Text>
            <View style={[{backgroundColor: colorSchemeFilter.filtersBackground}, bottomSheetFilter.buttonBackground]}>
                <View style={[bottomSheetFilter.buttonWrapper]}>
                    <ButtonStyled
                        text={t('types.all')}
                        textStyle={bottomSheetFilter.textStyle}
                        onPress={() => handleChangeEventTabs(TodayButtons.all)}
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
                        onPress={() => handleChangeEventTabs(TodayButtons.event)}
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
                        onPress={() => handleChangeEventTabs(TodayButtons.show)}
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
                        onPress={() => handleChangeEventTabs(TodayButtons.concert)}
                        style={[bottomSheetFilter.button, {
                            backgroundColor: isConcertActive ?
                                colorSchemeFilter.bnt_active :
                                colorSchemeFilter.bnt_inactive,
                        }]}
                    />
                </View>
                <FilterActionsSheet
                    {...{
                        setSubFilter,
                        filterAction,
                        setBottomFilter,
                        selectedFilters,
                        setFilterActions,
                        unselectedFilters,
                        setSelectedFilter,
                        colorSchemeFilter,
                        setUnselectedFilter
                    }}
                />
                <TouchableOpacity
                    style={[bottomSheetFilter.resetButton, {backgroundColor: colorSchemeFilter.bnt_active}]}
                    onPress={handleResetFilters}
                >
                    <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Reset Filters</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetView>
    </BottomSheet>
})


const bottomSheetFilter = StyleSheet.create({
    buttonBackground: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
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
        width: 90,
        height: 30,
    },
    contentContainer: {
        flex: 1,
        // paddingBottom: 45,
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
