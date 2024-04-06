import React, {useEffect, useState} from "react";
import {IEventCart, IFilters} from "../../types/event.type";
import {FilterService} from "../../services/FilterService/FilterService";
import {FilterTag} from "../FilterTag/FilterTag";
import {ScrollView, StyleSheet, View} from "react-native";
import {useAppSelector} from "../../hook/reduxHooks";
import {useTranslation} from "../../hook/translationHook";
import ButtonStyled from "../Button/Button";
import {isBetweenDates} from "../../helpers/helper";

interface IFilterActionsSheetProps {
    setSelectedFilters: React.Dispatch<React.SetStateAction<IFilters[]>>;
    setFilteredEvents: React.Dispatch<React.SetStateAction<IEventCart[]>>;
    todaysEvents: IEventCart[]
}

enum Filter {
    all = "all",
    upcoming = 'upcoming',
    live = 'live'
}

type FilterActionType = Filter.live | Filter.upcoming | Filter.all

export function FilterActionsSheet(props: IFilterActionsSheetProps) {
    const {setSelectedFilters, setFilteredEvents, todaysEvents} = props
    const [filterAction, setFilterActions] = useState(Filter.all)
    const [filters, setFilters] = useState<IFilters[]>([])
    const {lang} = useAppSelector(state => state.translation)
    const colors = useAppSelector(state => state.theme)
    const {t} = useTranslation()

    useEffect(() => {
        (async function () {
            try {
                const filterService = new FilterService()
                const result = await filterService.getFilterLists()
                setFilters(result)
            } catch (e) {
                console.log('Rejected to get filters', e)
            }
        })()
    }, []);
    const handlePress = (isPressed: boolean, filter: IFilters) => {
        if (!isPressed) setSelectedFilters((prev) => ([...prev, filter]))
        else setSelectedFilters((prev) => prev.filter(el => el.id !== filter.id))
    }

    const handleFilterChange = (action: FilterActionType) => {
        switch (action) {
            case Filter.all: {
                setFilteredEvents(todaysEvents)
                break;
            }
            case Filter.live: {
                setFilteredEvents(() => todaysEvents.filter(event => isBetweenDates(event.startDate, event.endDate)))
                break;
            }
            case Filter.upcoming: {
                setFilteredEvents(() => todaysEvents.filter(event => !isBetweenDates(event.startDate, event.endDate)))
                break;
            }
            default: {}
        }
        setFilterActions(action)
    }

    const isAllActive = filterAction === Filter.all;
    const isLiveActive = filterAction === Filter.live;
    const isUpcomingActive = filterAction === Filter.upcoming;
    const btn_inactive = colors.ACCENT["6"];
    const btn_active = colors.PRIMARY.MAIN;

    return <>
        <View style={[filterActionsSheetStyle.filterContainer]}>
            <ButtonStyled
                text={t('types.all')}
                onPress={() => handleFilterChange(Filter.all)}
                textColor={isAllActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isAllActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('live')}
                onPress={() => handleFilterChange(Filter.live)}
                textColor={isLiveActive ? "white" : colors.ACCENT["1"]}
                style={[filterActionsSheetStyle.button, {
                    backgroundColor: isLiveActive ? btn_active : btn_inactive,
                }]}
            />
            <ButtonStyled
                text={t('upcoming')}
                onPress={() => handleFilterChange(Filter.upcoming)}
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
        >
            {filters.map((filter) => <FilterTag
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
