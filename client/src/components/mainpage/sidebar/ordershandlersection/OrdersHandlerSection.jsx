import './OrdersHandlerSection.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'

const OrdersHandlerSection = () => {
    const { t } = useTranslation()

    return (
        <section className="orders-handler-container">
            <h2 className="orders-handler-title">
                {t("Orders")}
            </h2>
            <span className="orders-handler-track-option">
                {t("Track your order")}
            </span>
            <span className="orders-handler-returns-option">
                {t("Returns")}
            </span>
            <span className="orders-handler-help-center-option">
                {t("Help center")}
            </span>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
        </section>
    )
}

export default OrdersHandlerSection