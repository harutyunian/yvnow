import {useAppSelector} from "./reduxHooks";

type NestedObject = { [key: string]: any };
function getPropertyByPath(obj: NestedObject): any {
    return (path: string,) => {
        const keys = path.split('.');
        let value = obj;
        for (const key of keys) {
            if (!value || typeof value !== 'object') {
                // If the current value is null, undefined,
                // or not an object, return the original path
                // should be similar with i18n hook
                return path;
            }
            value = value[key];
        }
        return value !== undefined ? value : path;
    }
}

export function useTranslation() {
    const {translation} = useAppSelector(state => state.translation)
    return {t: getPropertyByPath(translation)}
}
