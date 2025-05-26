
import './DefaultProductContainer.scss'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import CategoriesCard from '../categoriescard/CategoriesCard'

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

const DefaultProductContainer = ({ products }) => {
    const { t } = useTranslation()

    return (
        <div className="default-product-container">
            <motion.h1
                className="default-product-container-title"
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
                {t("Random products")}
            </motion.h1>
            <div className='default-product-container-block scrollable'>
                {products.map(product => (
                    <CategoriesCard
                        key={product.product_id}
                        product_id={product.product_id}
                        name={product.name}
                        vendor={product.vendor}
                        price={product.price}
                        average_rating={product.average_rating}
                        review_count={product.review_count}
                        model_path={product.model_path || null}
                        image_path={product.image_path}
                    />
                ))}
            </div>
        </div>
    )
}

export default DefaultProductContainer
