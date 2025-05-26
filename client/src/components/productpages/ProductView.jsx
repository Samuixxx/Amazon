import './ProductView.scss'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import dayjs from 'dayjs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ProductView = ({
    productName,
    vendor,
    price,
    quantity,
    mappedDescription,
    mappedSpecifications,
    subcategoryName,
    model_path,
    images_arr,
    reviews,
    special_offer
}) => {
    const { t } = useTranslation()
    const [currentIndex, setCurrentIndex] = useState(0)

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

    const currentAsset = assetsArr[currentIndex]
    const nextAssets = assetsArr[(currentIndex + 1) % assetsArr.length]

    const { active, end_date, discount_percent } = special_offer || {}
    const mappedEndDate = dayjs(end_date).format('DD/MM/YY')

    const { average, count: review_count, items } = reviews
    const { rating, text, reviser, timestamp } = items
    const percentage = (average / 5) * 100
    const fiveStars = Array(5).fill(null)


    return (
        <section className="product-container">
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
                            camera-orbit="0deg 100deg 8m"
                            field-of-view="100deg"
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
                </div>
            </div>
        </section>
    )
}

export default ProductView
