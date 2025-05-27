import './ProductPaySection.scss'
import { useTranslation, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const SHIPPING_WORK_DAYS_NORMAL = 7
const SHIPPING_WORK_DAYS_WITH_PRIME = 3

const ProductPaySection = ({ price, quantityInStock, vendor, purchaseQuantity, setPurchaseQuantity, onAddToCart }) => {
    const { t } = useTranslation()
    const expectedNormalShippingDate = dayjs().add(SHIPPING_WORK_DAYS_NORMAL, 'day')
    const expectedPrimeShippingDate = dayjs().add(SHIPPING_WORK_DAYS_WITH_PRIME, 'day')
    const isLeastQuantity = quantityInStock > 15


    return (
        <div className="product-pay__container">
            <span className="product-pay__price">
                {`${price}$ `}
                <strong>{t("+ VAT")}</strong>
            </span>

            <span className="product-pay__shipping-day-expected-normal">
                {t("Estimated delivery: {{date}}", { date: expectedNormalShippingDate.format('D MMMM') })}
            </span>

            <span className="product-pay__shipping-day-expected-prime">
                <Trans
                    i18nKey="Or with prime: <strong>{{date}}</strong>"
                    values={{ date: expectedPrimeShippingDate.format('D MMMM') }}
                    components={{ strong: <strong /> }}
                />
            </span>

            <span className="product-pay__quantity-disponibility">
                {isLeastQuantity ? t("Available") : t("Not available")}
            </span>

            <form className="product-pay__purchase-controls" onSubmit={e => e.preventDefault()}>
                <select
                    name="purchase-quantity"
                    className="product-pay__purchase-quantity"
                    value={purchaseQuantity}
                    onChange={setPurchaseQuantity}
                >
                    {[...Array(10)].map((_, idx) => (
                        <option key={idx + 1} value={idx + 1} className="product-pay__purchase-option">
                            {idx + 1}
                        </option>
                    ))}
                </select>

                <button type="submit" className="product-pay__purchase-button" onClick={onAddToCart}>
                    {t("Add to cart")}
                </button>

                <button type="submit" className="product-pay__purchase-button">
                    {t("Purchase now")}
                </button>
            </form>

            <span className="product-pay__shipping-director">
                {t("Shipped by ShopHub Inc.")}
            </span>

            <span className="product-pay__vendor">
                {t("Vendor: {{vendor}}", { vendor })}
            </span>

            <span className="product-pay__payment-methods">
                <Link to="/payments/methods">{t("Explore all payment methods")}</Link>
            </span>
        </div>
    )
}

export default ProductPaySection
