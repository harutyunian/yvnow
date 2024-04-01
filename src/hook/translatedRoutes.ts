import {useTranslation} from "./translationHook";

export function useTranslatedRoutes() {
    const {t} = useTranslation()
    return {
        today: {
            name: t('tabs.today'),
            key: "today"
        },
        home: {name: 'Home', key: "home"},
        map: {
            name: t('tabs.map'),
            key: "map"
        },
        settings: {
            name: t('tabs.settings'),
            key: "settings"
        },
        partnerProfile: {
            name: t('partner.partner_profile'),
            key: 'profile'
        },
        eventDetails: {
            name: t('partner.event_details'),
            key: 'event_details'
        }
    }
}
