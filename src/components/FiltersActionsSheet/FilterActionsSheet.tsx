import React, {useCallback, useMemo} from "react";
import _ from 'lodash'
import {ScrollView, StyleSheet, View} from "react-native";
import {IEventCart, IFilters} from "../../types/event.type";
import {FilterTag} from "../FilterTag/FilterTag";
import {useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import ButtonStyled from "../Button/Button";
import {IColorScheme} from "../ButtomSheetFilters/ButtomSheetFilters";


export enum FilterAction {
    all = "all",
    today = "today",
    upcoming = 'upcoming',
    live = 'live'
}

export type FilterActionType = FilterAction.live | FilterAction.upcoming | FilterAction.all | FilterAction.today

interface IFilterActionsSheetProps {
    setBottomFilter: React.Dispatch<React.SetStateAction<FilterActionType>>;
    setSubFilter: React.Dispatch<React.SetStateAction<IFilters[]>>,
    subFilteredEvents: IEventCart[],
    subFilter?: IFilters[],
    selectedFilters: IFilters[],
    unselectedFilters: IFilters[],
    setSelectedFilter: React.Dispatch<React.SetStateAction<IFilters[]>>,
    setUnselectedFilter: React.Dispatch<React.SetStateAction<IFilters[]>>,
    setFilterActions: React.Dispatch<React.SetStateAction<FilterActionType>>,
    filterAction: FilterActionType,
    colorSchemeFilter: IColorScheme
}

export function FilterActionsSheet(props: IFilterActionsSheetProps) {
    const {
        setBottomFilter,
        subFilteredEvents,
        selectedFilters,
        unselectedFilters,
        setSelectedFilter,
        setUnselectedFilter,
        setFilterActions,
        filterAction,
        colorSchemeFilter
    } = props

    const {lang} = useAppSelector(state => state.translation)
    // const filters = useAppSelector(state => state.filters)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()


    const handlePress = useCallback((isPressed: boolean, filter: IFilters) => {
        const isFilterEmpty = subFilteredEvents.find(({filters}) => {
            return filters.find(({id}) => id === filter.id)
        });
        setSelectedFilter((prev) => {
            if (isPressed) return prev.filter((filters) => filters.id !== filter.id)
            return [filter, ...prev]
        })
        if (!isFilterEmpty) return
        setUnselectedFilter((prev) => {
            if (isPressed) return [filter, ...prev]
            return prev.filter((filters) => filters.id !== filter.id)
        })
    }, [unselectedFilters, selectedFilters])

    const handleFilterChange = (action: FilterActionType) => {
        setBottomFilter(action)
        setFilterActions(action)
    }


    const isAllActive = useMemo(() => filterAction === FilterAction.all, [filterAction]);
    const isLiveActive = useMemo(() => filterAction === FilterAction.live, [filterAction])
    const isUpcomingActive = useMemo(() => filterAction === FilterAction.upcoming, [filterAction]);
    const isTodayActive = useMemo(() => filterAction === FilterAction.today, [filterAction]);
    const renderFilterTag = useCallback((filter: IFilters, isPressed: boolean) => ( // Memoized renderFilterTag
        <FilterTag
            isPressed={isPressed}
            onPress={handlePress}
            filter={filter}
            text={filter[lang]}
            key={filter.id}
        />
    ), [handlePress, lang])

    return <View style={[filterActionsSheetStyle.wrapper]}>
        <View style={[filterActionsSheetStyle.filterContainer]}>
            <ButtonStyled
                text={t('types.all')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.all)}
                textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isAllActive ? colorSchemeFilter.bnt_active : colorSchemeFilter.bnt_inactive,
                }]}
            />
            <ButtonStyled
                text={t('live')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.live)}
                textColor={isLiveActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isLiveActive ? colorSchemeFilter.bnt_active : colorSchemeFilter.bnt_inactive,
                }]}
            />
            <ButtonStyled
                text={t('tabs.today')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.today)}
                textColor={isTodayActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isTodayActive ? colorSchemeFilter.bnt_active : colorSchemeFilter.bnt_inactive,
                }]}
            />
            <ButtonStyled
                text={t('upcoming')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.upcoming)}
                textColor={isUpcomingActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isUpcomingActive ? colorSchemeFilter.bnt_active : colorSchemeFilter.bnt_inactive,
                }]}
            />
        </View>
        <View style={[filterActionsSheetStyle.filterTagContainer]}>
            <ScrollView
                style={[filterActionsSheetStyle.scroll]}
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {selectedFilters.map((filter) => renderFilterTag(filter, true))}
                {unselectedFilters.map((filter) => renderFilterTag(filter, false))}
            </ScrollView>
        </View>
    </View>
}

const filterActionsSheetStyle = StyleSheet.create({
    filterTagContainer: {
        height: 30,
        width: "100%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 12,
        fontWeight: '500'
    },
    wrapper: {
        rowGap: 10,
        padding: 0,
    },
    scroll: {},
    filterContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: 85,
        height: 35,
    }
})
