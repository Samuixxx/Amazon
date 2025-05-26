import './ProfileSection.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faUser, faShoppingCart, faGift } from '@fortawesome/free-solid-svg-icons'

const ProfileSection = () => {
    const { t } = useTranslation()

    return (
        <section className="profile-container">
            <h2 className="profile-title">
                {t("Profile")}
            </h2>
            <span className="profile-personal-option">
                <FontAwesomeIcon icon={faUser} size='xl' />
                {t("Your profile")}
            </span>
            <span className="profile-cart-option">
                <FontAwesomeIcon icon={faShoppingCart} size='xl' />
                {t("Your cart")}
            </span>
            <span className="profile-wishes-option">
                <FontAwesomeIcon icon={faGift} size='xl' />
                {t("Your wishes")}
            </span>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
        </section>
    )
}

export default ProfileSection