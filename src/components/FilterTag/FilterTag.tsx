import {Badge} from "native-base";
import {IFilters} from "../../types/event.type";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {AcceptIcon, PlusIcon} from "../Svg/Svg";
import {useAppSelector} from "../../hook/reduxHooks";

interface IFilterTagProps {
    filter: IFilters,
    text: string,
    onPress: (isPressed: boolean, filter: IFilters) => void,
}


export function FilterTag(props: IFilterTagProps) {
    const {filter, text, onPress} = props
    const [pressed, setPressed] = useState(false)
    const colors = useAppSelector(state => state.theme)
    const handlePress = () => {
        onPress(pressed, filter)
        setPressed(prev => !prev)
    }

    const icon = pressed ? <AcceptIcon style={[filterTagStyle.icon]} fill='green'/> :
        <PlusIcon style={[filterTagStyle.icon]} fill='white'/>

    return <TouchableOpacity onPress={handlePress} style={[filterTagStyle.wrapper]}>
        <Badge style={[filterTagStyle.container]}
            _text={{fontWeight: '900'}}
               colorScheme={pressed ? "success" : colors.FILTER_COLOR}
            variant="solid"
               rightIcon={icon}>
            {text}
        </Badge>
    </TouchableOpacity>
}

const filterTagStyle = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5
    },
    container: {
        borderRadius: 10,
    },
    icon: {
        width: 25,
        height: 25,
    }
})
