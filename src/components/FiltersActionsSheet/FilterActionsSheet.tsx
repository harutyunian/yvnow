import React from "react";
import _ from 'lodash'
import {ScrollView, StyleSheet, View} from "react-native";
import {IFilters} from "../../types/event.type";
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
    const {setBottomFilter,
        setSubFilter,
        selectedFilters,
        unselectedFilters,
        setSelectedFilter,
        setUnselectedFilter,
        setFilterActions,
        filterAction,
        colorSchemeFilter
    } = props

    const {lang} = useAppSelector(state => state.translation)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    const handlePress = (isPressed: boolean, filter: IFilters) => {

        setUnselectedFilter((prev)=>{
            if(isPressed) return prev.filter((filters)=>filters.id !== filter.id)
            return [filter, ...prev]
        })
        setSelectedFilter((prev)=>{
            if(isPressed) return [filter, ...prev]
            return prev.filter((filters)=>filters.id !== filter.id)
        })
        setSubFilter(prev => {
            return isPressed ? _.filter(prev, ({id}) => id !== filter.id) : _.xorBy(prev, [filter], 'id');
        });
    };

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


    const filterBackground = colors.ACCENT['3']

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
                    backgroundColor: isLiveActive ?colorSchemeFilter.bnt_active : colorSchemeFilter.bnt_inactive,
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
                {unselectedFilters.map((filter) => <FilterTag
                    isPressed
                    onPress={handlePress}
                    filter={filter}
                    text={filter[lang]}
                    key={filter.id}/>)
                }
                {selectedFilters.map((filter) => <FilterTag
                    onPress={handlePress}
                    filter={filter}
                    text={filter[lang]}
                    key={filter.id}/>)}
            </ScrollView>
        </View>
    </View>
}

const filterActionsSheetStyle = StyleSheet.create({
    filterTagContainer: {
        width: "100%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 10,
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
        width: 90,
        height: 30,
    }
})
