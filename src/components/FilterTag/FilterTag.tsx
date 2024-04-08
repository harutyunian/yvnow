import {Badge} from "native-base";
import {IFilters} from "../../types/event.type";
import {StyleSheet, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {AcceptIcon, PlusIcon} from "../Svg/Svg";

interface IFilterTagProps {
    filter: IFilters,
    text: string,
    onPress: (isPressed: boolean, filter: IFilters) => void,
}


export function FilterTag(props: IFilterTagProps) {
    const {filter, text, onPress} = props
    const [pressed, setPressed] = useState(false)

    const handlePress = () => {
        onPress(pressed, filter)
        setPressed(prev => !prev)
    }

    const icon = pressed ? <AcceptIcon style={[filterTagStyle.icon]} fill='#16a34a'/> :
        <PlusIcon style={[filterTagStyle.icon]} fill='#0284c7'/>

    return <TouchableOpacity onPress={handlePress} style={[filterTagStyle.wrapper]}>
        <Badge style={[filterTagStyle.container]}
               _text={{color: pressed ? '#16a34a' : '#0284c7', fontWeight: '900'}}
               colorScheme={pressed ? "success" : "info"}
               variant='subtle'
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
