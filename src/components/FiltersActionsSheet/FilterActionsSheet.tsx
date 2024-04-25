import React, {useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {IFilters} from "../../types/event.type";
import {FilterTag} from "../FilterTag/FilterTag";
import {useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import ButtonStyled from "../Button/Button";


interface IFilterActionsSheetProps {
    setBottomFilter: React.Dispatch<React.SetStateAction<FilterActionType>>;
    setSubFilter: React.Dispatch<React.SetStateAction<IFilters[]>>
}

export enum FilterAction {
    all = "all",
    today = "today",
    upcoming = 'upcoming',
    live = 'live'
}

export type FilterActionType = FilterAction.live | FilterAction.upcoming | FilterAction.all | FilterAction.today

export function FilterActionsSheet(props: IFilterActionsSheetProps) {
    const {setBottomFilter, setSubFilter} = props
    const [filterAction, setFilterActions] = useState(FilterAction.all)
    const {lang} = useAppSelector(state => state.translation)
    const filters = useAppSelector(state => state.filters)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    const handlePress = (isPressed: boolean, filter: IFilters) => {
        if (!isPressed) {
            setSubFilter((prev) => ([...prev, filter]))
        } else {
            setSubFilter((prev) => {
                return prev.filter(({id}) => id !== filter.id)
            })
        }
    }

    const handleFilterChange = (action: FilterActionType) => {
        setBottomFilter(action)
        setFilterActions(action)
    }

    const isAllActive = filterAction === FilterAction.all;
    const isLiveActive = filterAction === FilterAction.live;
    const isUpcomingActive = filterAction === FilterAction.upcoming;
    const isTodayActive = filterAction === FilterAction.today;

    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    return <>
        <View style={[filterActionsSheetStyle.filterContainer]}>
            <ButtonStyled
                text={t('types.all')}
                onPress={() => handleFilterChange(FilterAction.all)}
                textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isAllActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('live')}
                onPress={() => handleFilterChange(FilterAction.live)}
                textColor={isLiveActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isLiveActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('tabs.today')}
                onPress={() => handleFilterChange(FilterAction.today)}
                textColor={isTodayActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isTodayActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('upcoming')}
                onPress={() => handleFilterChange(FilterAction.upcoming)}
                textColor={isUpcomingActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isUpcomingActive ? btn_active : btn_inactive,
                }]}
            />
        </View>
        <ScrollView
            style={[filterActionsSheetStyle.scroll]}
            showsHorizontalScrollIndicator={false}
            horizontal
        >{filters.map((filter) => <FilterTag
            onPress={handlePress}
            filter={filter}
            text={filter[lang]}
            key={filter.id}/>)}
        </ScrollView>
    </>
}

const filterActionsSheetStyle = StyleSheet.create({
    scroll: {
        height: 50
    },
    filterContainer: {
        paddingBottom: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        width: 90,
        height: 40,
    }
})
