import {Heading, HStack, Spinner} from "native-base";
import React from "react";
import {useTranslation} from "../../hook/translationHook";

export function Loader() {
    const {t} = useTranslation()

    return <HStack>
        <Spinner accessibilityLabel="Loading posts"/>
        <Heading color="primary.500" fontSize="md">
            {t('loading')}
        </Heading>
    </HStack>
}
