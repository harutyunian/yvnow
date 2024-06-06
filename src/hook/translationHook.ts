import {useAppSelector} from "./reduxHooks";
import _ from 'lodash'

type NestedObject = { [key: string]: any };

function getPropertyByPath(obj: NestedObject): any {
    return (path: string) => _.get(obj, path, path);
}

export function useTranslation() {
    const {translation} = useAppSelector(state => state.translation)
    return {t: getPropertyByPath(translation)}
}
