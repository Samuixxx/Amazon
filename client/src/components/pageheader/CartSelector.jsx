import './CartSelector.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'

const CartSelector = () => {
    const { t } = useTranslation()

    return(
        <section className="user_cart">
            <FontAwesomeIcon icon={faShoppingCart} size="2x"/>
            <h2 className="cart_ref">
                {t("Your cart")}
            </h2>
            <span className="cart_items_count">
                0
            </span>
        </section>
    )
}

export default CartSelector;