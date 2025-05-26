import './PaymentAndShippingSection.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan, faCreditCard, faTruckFast } from '@fortawesome/free-solid-svg-icons'

const PaymentAndShippingSection = () => {
    const { t } = useTranslation()

    return (
        <section className="payment-shipping-container">
            <h2 className="payment-shipping-title">
                {t("Payments and Shipments")}
            </h2>
            <span className="payment-option-option">
                <FontAwesomeIcon icon={faCreditCard} size='xl' /> {t("Payments")}
            </span>
            <span className="shipping-option-option">
                <FontAwesomeIcon icon={faTruckFast} size='xl' /> {t("Shipping")}
            </span>
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            <FontAwesomeIcon icon={faGreaterThan} size="xs" />
        </section>
    )
}

export default PaymentAndShippingSection