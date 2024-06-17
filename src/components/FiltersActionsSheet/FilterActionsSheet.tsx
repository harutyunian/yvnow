import React, {useState} from "react";
import _, {find} from 'lodash'
import {ScrollView, StyleSheet, View} from "react-native";
import {IFilters} from "../../types/event.type";
import {FilterTag} from "../FilterTag/FilterTag";
import {useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import ButtonStyled from "../Button/Button";


interface IFilterActionsSheetProps {
    setBottomFilter: React.Dispatch<React.SetStateAction<FilterActionType>>;
    setSubFilter: React.Dispatch<React.SetStateAction<IFilters[]>>,
    subFilter?: IFilters[],
}

export enum FilterAction {
    all = "all",
    today = "today",
    upcoming = 'upcoming',
    live = 'live'
}

export type FilterActionType = FilterAction.live | FilterAction.upcoming | FilterAction.all | FilterAction.today

export function FilterActionsSheet(props: IFilterActionsSheetProps) {
    const {setBottomFilter, setSubFilter, subFilter} = props
    const [filterAction, setFilterActions] = useState(FilterAction.all)
    const [selectedFilters, setSelectedFilter] = useState<IFilters[]>([])
    const {lang} = useAppSelector(state => state.translation)
    const filters = useAppSelector(state => state.filters)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    const handlePress = (isPressed: boolean, filter: IFilters) => {

        setSelectedFilter((prev) => {
            if (!isPressed) {
                return [filter, ...prev]
            }
            return prev.filter((el) => el.id !== filter.id)
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
        <View style={[filterActionsSheetStyle.filterContainer, {backgroundColor: filterBackground}]}>
            <ButtonStyled
                text={t('types.all')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.all)}
                textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isAllActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('live')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.live)}
                textColor={isLiveActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isLiveActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('tabs.today')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.today)}
                textColor={isTodayActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isTodayActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('upcoming')}
                textStyle={filterActionsSheetStyle.textStyle}
                onPress={() => handleFilterChange(FilterAction.upcoming)}
                textColor={isUpcomingActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isUpcomingActive ? btn_active : btn_inactive,
                }]}
            />
        </View>
        <View style={[filterActionsSheetStyle.filterTagContainer]}>
            <ScrollView
                style={[filterActionsSheetStyle.scroll]}
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {selectedFilters.map((filter) => <FilterTag
                    isPressed
                    onPress={handlePress}
                    filter={filter}
                    text={filter[lang]}
                    key={filter.id}/>)
                }
                {filters.map((filter) => <FilterTag
                    onPress={handlePress}
                    isPressed={false}
                    filter={filter}
                    text={filter[lang]}
                    key={filter.id}/>)}
            </ScrollView>
        </View>
    </View>
}

const filterActionsSheetStyle = StyleSheet.create({
    filterTagContainer: {
        // bottom: 10,
        width: "100%",
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        // height: 50
    },
    textStyle: {
        fontSize: 12,
        fontWeight: '500'
    },
    wrapper: {
        top: 15,
        padding: 0,
    },
    scroll: {},
    filterContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderRadius: 10
    },
    button: {
        width: 75,
        height: 30,
    }
})
