import {useTranslation} from "./translationHook";

export function useTranslatedRoutes() {
    const {t} = useTranslation()
    return {
        today: t('tabs.today'),
        home: 'Home',
        map: t('tabs.map'),
        settings: t('tabs.settings'),
        partnerProfile: t('partner.partner_profile'),
        eventDetails: t('partner.event_details')
    }
}
