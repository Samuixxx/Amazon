import './ProductView.scss'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ProductPaySection from './ProductPaySection'
import SubCategoriesProducts from './subcategoryproducts/SubCategoryProducts'
import { addProductToCart } from '../../features/cart'
import CustomerReviews from './CustomerReviews'

const ProductView = ({
    productId,
    productName,
    vendor,
    price,
    quantity,
    description,
    specifications,
    subcategoryName,
    model_path,
    images_arr,
    reviews,
    special_offer
}) => {
    const { t, i18n } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [purchaseQuantity, setPurchaseQuantity] = useState(1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    const assetsArr = [
        { type: 'model', url: model_path },
        ...images_arr.map(img => ({ type: 'img', url: img }))
    ]

    const handleNextAssets = () => {
        setCurrentIndex(i => (i + 1) % assetsArr.length)
    }

    const handlePreviousAssets = () => {
        setCurrentIndex(i => (i > 0 ? i - 1 : assetsArr.length - 1))
    }

    const mappedDescription = description[i18n.language.split('-')[0]]
    const mappedSpecifications = specifications[i18n.language.split('-')[0]]

    const currentAsset = assetsArr[currentIndex]
    const nextAssets = assetsArr[(currentIndex + 1) % assetsArr.length]

    const { active, end_date, discount_percent } = special_offer || {}
    const mappedEndDate = dayjs(end_date).format('DD/MM/YY')

    const { average, count: review_count, items } = reviews
    const percentage = (average / 5) * 100
    const fiveStars = Array(5).fill(null)

    const handleCartUpdate = () => {
        dispatch(addProductToCart({
            productId,
            quantity: purchaseQuantity
        }))
    }


    return (
        <section className="product-container">
            <div className="product-container__visual">
                <div className="product-left__views">
                    <div className="product-views-controls">
                        <button className="product-views-controls__button" onClick={handleNextAssets}>
                            <FontAwesomeIcon icon={faArrowUp} size='xl' />
                        </button>
                        {nextAssets.type === 'model' ? (
                            <model-viewer
                                src={process.env.REACT_APP_API_URL + nextAssets.url}
                                alt="3D Model"
                                auto-rotate
                                camera-controls
                                className='product-views__asset_preview'
                            />
                        ) : (
                            <img
                                src={process.env.REACT_APP_API_URL + nextAssets.url}
                                alt="Product"
                                className='product-views__asset_preview'
                            />
                        )}
                        <button className="product-views-controls__button" onClick={handlePreviousAssets}>
                            <FontAwesomeIcon icon={faArrowDown} size='xl' />
                        </button>
                    </div>
                    <div className="product-views-assets-container">
                        {currentAsset.type === 'model' ? (
                            <model-viewer
                                src={process.env.REACT_APP_API_URL + currentAsset.url}
                                alt="3D Model"
                                auto-rotate
                                camera-controls
                                className='product-views__asset'
                                camera-orbit="0deg 75deg 5m"
                                field-of-view="60deg"
                                exposure="0.9"
                                max-camera-orbit="auto auto 20m"
                                min-camera-orbit="auto auto 5m"
                            />
                        ) : (
                            <img src={process.env.REACT_APP_API_URL + currentAsset.url} alt="Product" className='product-views__asset' />
                        )}
                    </div>
                </div>

                <div className="product-right__info">
                    <div className="product-info__titles">
                        <h2 className="product-info-title">
                            {productName}
                        </h2>
                        <span>{vendor}</span>
                        <div className="categories-card-ratings">
                            <div className="stars-filled" style={{ width: `${percentage}%` }}>
                                {fiveStars.map((_, i) => (
                                    <span key={`filled-star-${i}`} className="star">&#9733;</span>
                                ))}
                            </div>
                            <div className="stars-empty">
                                {fiveStars.map((_, i) => (
                                    <span key={`empty-star-${i}`} className="star">&#9733;</span>
                                ))}
                            </div>
                            <span className="rating-count">{t("Reviews", { number: review_count })}</span>
                        </div>
                    </div>
                    <div className="product-info">
                        {active &&
                            <div className="product-info__price">
                                <span className="product-info__price-offer">
                                    <Trans
                                        i18nKey="valid_until"
                                        values={{ endDate: mappedEndDate }}
                                        components={{ strong: <strong /> }}
                                    />
                                </span>
                                <span>
                                    -{discount_percent}%&nbsp;
                                    <em>
                                        {active && discount_percent
                                            ? (price * (1 - discount_percent / 100)).toFixed(2)
                                            : price
                                        }€
                                    </em>
                                </span>
                            </div>
                        }
                        <span className="product-iva__explanation-container">
                            {t("All prices on ShopHub include VAT. The final amount may vary depending on your shipping address during checkout. Click here to learn more.")}
                        </span>
                    </div>
                    <ProductPaySection
                        price={price}
                        quantityInStock={quantity}
                        vendor={vendor}
                        purchaseQuantity={purchaseQuantity}
                        setPurchaseQuantity={setPurchaseQuantity}
                        onAddToCart={handleCartUpdate}
                    />
                </div>
            </div>
            <SubCategoriesProducts subcategoryName={subcategoryName} />
            <div className="product-info__container">
                <div className="product-info__container-left">
                    <h2 className="product-info__left-title">
                        {t("Product details")}
                    </h2>
                    <table className="product-info__left-details">
                        <thead>
                            <tr>
                                <th colSpan="2">{t(`Informazioni su {{productName}}`, {productName})}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>{t("Vendor")}</th>
                                <td>{vendor}</td>
                            </tr>
                            <tr>
                                <th>{t("Name")}</th>
                                <td>{productName}</td>
                            </tr>
                            <tr>
                                <th>{t("Subcategory")}</th>
                                <td>{subcategoryName}</td>
                            </tr>
                            <tr>
                                <th>{t("Quantity")}</th>
                                <td>{quantity}</td>
                            </tr>
                            <tr>
                                <th>{t("Description")}</th>
                                <td>{mappedDescription}</td>
                            </tr>
                            <tr>
                                <th>{t("Specifications")}</th>
                                <td>{mappedSpecifications}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="product-info__container-right">
                    <div className="product-info__additional">
                        <h2>{t("Additional Information")}</h2>
                        <div className="info-row">
                            <strong>ASIN</strong>: X123456789
                        </div>
                        <div className="info-row reviews">
                            <strong>{t("Average Reviews")}</strong>:&nbsp;
                            <div className="categories-card-ratings" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "8px" }}>
                                <div className="stars-filled" style={{ width: `90%` }}>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={`filled-star-${i}`} className="star">&#9733;</span>
                                    ))}
                                </div>
                                <div className="stars-empty">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={`empty-star-${i}`} className="star">&#9733;</span>
                                    ))}
                                </div>
                            </div>
                            <span className="rating-text">4.5 {t("out of 5 stars")}</span>
                            <span className="votes" style={{ marginLeft: "6px" }}>42,599 {t("votes")}</span>
                        </div>
                        <div className="info-row">
                            <strong>{t("Amazon Bestseller Rank")}</strong><br />
                            No. 2 {t("in Grocery & Household")} (<a href="#top100">{t("View Top 100 in Grocery & Household")}</a>)<br />
                            No. 2 {t("in Coffee Pods & Capsules")}
                        </div>
                        <div className="info-row">
                            <strong>{t("Legal Warranty, Right of Withdrawal and Return Policy")}</strong><br />
                            {t("Warranty and withdrawal: If you want to return a product within 30 days of receipt because you changed your mind, please see our help page on the Right of Withdrawal. If you received a defective or damaged product, please see our help page on Legal Warranty. For specific information on purchases made on Marketplace, please see our help page on Returns and refunds for Marketplace items.")}
                        </div>
                    </div>

                </div>
            </div>
            {items && <CustomerReviews items={items} />}
            {!isAuthenticated 
            && <div className="product-user__not-logged">
                    <span className="product-user__not-logged-info">
                        {t("Don't have accessed yet?")}
                    </span>
                    <button onClick={() => { navigate('/auth') }}>
                        {t("Sign in")}
                    </button>
                </div>
            }
        </section>
    )
}

export default ProductView
