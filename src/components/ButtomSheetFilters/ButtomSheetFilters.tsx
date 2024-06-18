import React, {useEffect, useRef, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import ButtonStyled from "../Button/Button";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterAction, FilterActionsSheet, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
import {useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import {TodayTabs} from "../../types/filter.type";
import {IFilters} from "../../types/event.type";


interface IBottomSheetFiltersProps {
    topFilter: TodayTabs,
    setTopFilter: React.Dispatch<React.SetStateAction<TodayTabs>>,
    setBottomFilter: React.Dispatch<React.SetStateAction<FilterActionType>>;
    setSubFilter: React.Dispatch<React.SetStateAction<IFilters[]>>
}

export default function BottomSheetFilters(props: IBottomSheetFiltersProps) {
    const {topFilter, setTopFilter, setBottomFilter, setSubFilter} = props

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


    const handleResetFilters = () => {
        setSelectedFilter(filters)
        setUnselectedFilter([])
        setSubFilter([]);
        handleChangeEventTabs(TodayButtons.all)
        setFilterActions(FilterAction.all)
    }

    const isAllActive = topFilter === TodayButtons.all;
    const isEventActive = topFilter === TodayButtons.event;
    const isShowActive = topFilter === TodayButtons.show;
    const isConcertActive = topFilter === TodayButtons.concert;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    const filterBackground = colors.ACCENT['3']

    return <BottomSheet
        snapPoints={["10%", "38%"]}
        index={-1}
        ref={bottomSheetRef}
    >
        <BottomSheetView style={[{...bottomSheetFilter.contentContainer}, {backgroundColor: btn_inactive}]}>
            <Text style={{
                color: 'white',
                fontSize: 22,
                paddingVertical: 4,
                fontWeight: '500'
            }}>Select options</Text>
            <View style={[bottomSheetFilter.buttonWrapper, {backgroundColor: filterBackground}]}>
                <ButtonStyled
                    text={t('types.all')}
                    textStyle={bottomSheetFilter.textStyle}
                    onPress={() => handleChangeEventTabs(TodayButtons.all)}
                    textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isAllActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.event')}
                    textStyle={bottomSheetFilter.textStyle}
                    textColor={isEventActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.event)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isEventActive ? btn_active : btn_inactive
                    }]}
                />
                <ButtonStyled
                    text={t('types.show')}
                    textStyle={bottomSheetFilter.textStyle}
                    textColor={isShowActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.show)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isShowActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.concert')}
                    textStyle={bottomSheetFilter.textStyle}
                    textColor={isConcertActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.concert)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isConcertActive ? btn_active : btn_inactive,
                    }]}
                />
            </View>
            <FilterActionsSheet
                {...{
                    filterAction,
                    setFilterActions,
                    setBottomFilter,
                    setSubFilter,
                    selectedFilters,
                    unselectedFilters,
                    setSelectedFilter,
                    setUnselectedFilter
                }}
            />
            <TouchableOpacity style={[{...bottomSheetFilter.resetButton}, {backgroundColor: btn_active}]}
                              onPress={handleResetFilters}
            >
                <Text style={{color: 'white'}}>Reset Filters</Text>
            </TouchableOpacity>
        </BottomSheetView>
    </BottomSheet>
}
const bottomSheetFilter = StyleSheet.create({
    resetButton: {
        top: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 10
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
        width: 75,
        height: 30,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        paddingTop: 0,
    },
    buttonWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 10
    },
});
