import {Heading, HStack, Spinner} from "native-base";
import React from "react";

export function Loader() {
    return <HStack>
        <Spinner accessibilityLabel="Loading posts"/>
        <Heading color="primary.500" fontSize="md">
            Loading
        </Heading>
    </HStack>
}
