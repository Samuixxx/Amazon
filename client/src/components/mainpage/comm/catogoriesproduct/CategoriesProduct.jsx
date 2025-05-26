import './CategoriesProduct.scss'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../../../../axios'
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

const CategoriesProduct = ({ category }) => {
    const { t } = useTranslation()
    const [products, setProducts] = useState(null)
    const limit = 20

    useEffect(() => {
        const controller = new AbortController()
        const { signal } = controller

        const getProducts = async () => {
            try {
                const request = await api.get(`/api/home/getDataByCategory?categoryName=${encodeURIComponent(category)}&limit=${limit}`, { signal })
                const data = request.data
                if (data.ok) setProducts(data.products)
                else console.error(data.message)
            } catch (error) {
                if (!['AbortError', 'CanceledError'].includes(error.name)) {
                    console.error('Fetch error:', error)
                }
            }
        }

        if (category) {
            getProducts()
        }

        return () => {
            controller.abort()
        }
    }, [category])

    if (!products) {
        return <div>{t('Loading...')}</div>
    }

    return (
        <div className="categories-product-container">
            <h1 className="categories-product-container-title"
            >
                {category}
            </h1>
            <div className='category-products-block scrollable'>
                {products.map(products => {
                    return (
                        <CategoriesCard
                            key={products.product_id}
                            product_id={products.product_id}
                            name={products.name}
                            vendor={products.vendor}
                            price={products.price}
                            average_rating={products.average_rating}
                            review_count={products.review_count}
                            model_path={products.model_path || null}
                            image_path={products.image_path}
                        />
                    );
                })}
            </div>
        </div>
    )

}

export default CategoriesProduct
