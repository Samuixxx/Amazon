import './SettingsSection.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const SettingsSection = () => {
    const { t } = useTranslation()

    return (
        <section className="settings-container">
            <h2 className="settings-title">
                {t("Settings")}
            </h2>
            <span className="settings-lang-option">
                {t("Lang")}
            </span>
            <span className="settings-theme-option">
                {t("Theme")}
            </span>
            <span className="settings-logout-option">
                <FontAwesomeIcon icon={faRightFromBracket} size='xl' />
                {t("Logout")}
            </span>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
        </section>
    )
}

export default SettingsSection