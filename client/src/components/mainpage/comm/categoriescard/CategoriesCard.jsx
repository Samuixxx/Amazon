import './CategoriesCard.scss'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import noimagefound from '../../../../assets/products/noimagefound.jpg'

const CategoriesCard = ({
    product_id, name, vendor, price,
    average_rating, review_count,
    model_path, image_path
}) => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const cardRef = useRef(null)
    const [showModel, setShowModel] = useState(false)
    const percentage = (average_rating / 5) * 100

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShowModel(true);
                    if (model_path) {
                        import('@google/model-viewer');
                    }
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) observer.observe(cardRef.current)

        return () => {
            if (cardRef.current) observer.disconnect()
        };
    }, [model_path])

    const handleClick = () => {
        navigate(`/product?product_id=${product_id}`)
    }

    const fiveStars = Array(5).fill(null)

    return (
        <article className="categories-card" onClick={handleClick} ref={cardRef}>
            {showModel && model_path ? (
                <model-viewer
                    src={`${process.env.REACT_APP_API_URL}${model_path}`}
                    className="categories-card-model"
                    alt="3D model of a product"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity={1}
                    autoplay
                    exposure={1}
                    camera-orbit="0deg 90deg 10m"
                    field-of-view="30deg"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
            ) : (
                <img
                    src={image_path ? `${process.env.REACT_APP_API_URL}${image_path}` : noimagefound}
                    className="categories-card-image"
                    loading='lazy'
                    alt="Anteprima prodotto"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                />
            )}

            <h2 className="categories-card-title">{name}</h2>
            <h3 className="categories-card-vendor">{vendor}</h3>

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
                <span className="rating-count">{review_count}</span>
            </div>

            <span className="categories-card-price">{price + '$'}</span>
            <span className="categories-card-info">{t('Free shipping with ShopHub prime!')}</span>
        </article>
    );
};

export default CategoriesCard;