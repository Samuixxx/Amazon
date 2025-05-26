import './SpecialOffersContainer.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SpecialOfferCard from '../specialofferscard/SpecialOfferCard'

const gradientAnimation = {
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%"],
        transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
        }
    }
}

const SpecialOffersContainer = ({ specialOffers }) => {
    const { t } = useTranslation()
    const userAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

    return (
        <div className="special-offers-container">
            <motion.h1
                className="special-offers-container-title"
                variants={gradientAnimation}
                animate="animate"
                style={{
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent"
                }}
            >
                {t("Special offers")}
            </motion.h1>
            <div className='special-offers-block'>
                {specialOffers.map((offer, index) => {
                    const isLast = index === specialOffers.length - 1;

                    if (isLast && !userAuthenticated) {
                        return (

                            <div key="auth-prompt" className="special-offer-auth-prompt">
                                <h3>{t("Sign in to enjoy the fantastic ShopHub exprerience")}</h3>
                                <button onClick={() => navigate('/auth')}>{t("Sign in")}</button>
                                <span>&copy; ShopHub {new Date().getFullYear()} Inc.</span>
                            </div>

                        );
                    }

                    return (
                        <SpecialOfferCard
                            key={offer.product_id}
                            product_id={offer.product_id}
                            name={offer.name}
                            discount={offer.discount}
                            end_date={offer.end_date}
                            model_path={offer.model_path || null}
                            image_path={offer.image_path}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default SpecialOffersContainer
