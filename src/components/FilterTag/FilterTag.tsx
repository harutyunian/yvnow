import {Badge} from "native-base";
import {IFilters} from "../../types/event.type";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {useAppSelector} from "../../hook/reduxHooks";

interface IFilterTagProps {
    filter: IFilters,
    text: string,
    onPress: (isPressed: boolean, filter: IFilters) => void,
    isPressed?: boolean
}

export function FilterTag(props: IFilterTagProps) {
    const {filter, text, onPress, isPressed} = props
    const [pressed, setPressed] = useState(isPressed || false)
    const colors = useAppSelector(state => state.theme)
    const handlePress = () => {
        onPress(pressed, filter)
        setPressed(prev => !prev)
    }

    return <TouchableOpacity onPress={handlePress} style={[filterTagStyle.wrapper]}>
        <Badge style={[filterTagStyle.container]}
               _text={{...filterTagStyle.textStyle, color: colors.ACCENT["1"]}}
               colorScheme={isPressed ? 'success' : colors.FILTER_COLOR}
               variant={'outline'}
        >
            {text}
        </Badge>
    </TouchableOpacity>
}

const filterTagStyle = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5
    },
    textStyle: {
        fontWeight: '900',
    },
    container: {
        borderRadius: 10,
        borderWidth: 2
    },
    icon: {
        width: 25,
        height: 25,
    }
})
