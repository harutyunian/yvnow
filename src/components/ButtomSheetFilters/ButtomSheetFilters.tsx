import React, {useEffect, useRef} from "react";
import {StyleSheet, View} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import ButtonStyled from "../Button/Button";
import {TodayButtons} from "../../pages/TodayEvents/switchButtons.enum";
import {FilterActionsSheet, FilterActionType} from "../FiltersActionsSheet/FilterActionsSheet";
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

    const handleChangeEventTabs = (type: TodayTabs) => setTopFilter(type)


    useEffect(() => {
        setTimeout(()=>{
            bottomSheetRef.current?.expand()
        },1000)

    }, []);

    const isAllActive = topFilter === TodayButtons.all;
    const isEventActive = topFilter === TodayButtons.event;
    const isShowActive = topFilter === TodayButtons.show;
    const isConcertActive = topFilter === TodayButtons.concert;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    return <BottomSheet
        snapPoints={["7%", "30%"]}
        index={-1}
        ref={bottomSheetRef}
    >
        <BottomSheetView style={bottomSheetFilter.contentContainer}>
            <View style={[bottomSheetFilter.buttonWrapper]}>
                <ButtonStyled
                    text={t('types.all')}
                    onPress={() => handleChangeEventTabs(TodayButtons.all)}
                    textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isAllActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.event')}
                    textColor={isEventActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.event)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isEventActive ? btn_active : btn_inactive
                    }]}
                />
                <ButtonStyled
                    text={t('types.show')}
                    textColor={isShowActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.show)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isShowActive ? btn_active : btn_inactive,
                    }]}
                />
                <ButtonStyled
                    text={t('types.concert')}
                    textColor={isConcertActive ? "white" : colors.ACCENT["1"]}
                    onPress={() => handleChangeEventTabs(TodayButtons.concert)}
                    style={[bottomSheetFilter.button, {
                        backgroundColor: isConcertActive ? btn_active : btn_inactive,
                    }]}
                />
            </View>
            <FilterActionsSheet
                {...{setBottomFilter, setSubFilter}}
            />
        </BottomSheetView>
    </BottomSheet>
}
const bottomSheetFilter = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        marginTop: 2,
        rowGap: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        width: "100%",
    },
    button: {
        backgroundColor: 'green',
        width: 90,
        height: 40,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    buttonWrapper: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        columnGap: 5,
    },
});
