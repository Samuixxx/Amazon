import './ProductPage.scss'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../axios'
import PageHeader from '../../components/pageheader/PageHeader'
import CategoriesNavbar from '../../components/categories/CategoriesNavbar'
import ProductView from '../../components/productpages/ProductView'
import MainPageSideBar from '../../components/mainpage/sidebar/SideBar'

const ProductPage = () => {
    const { i18n } = useTranslation()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const productId = params.get('product_id')

    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!productId) return

        const getProduct = async () => {
            try {
                const request = await api.get(`/api/products/info/${productId}`)
                const data = request.data
                if (data.ok) {
                    console.log(data.product)
                    setProduct(data.product)
                    setError(null)
                } else {
                    setError('Product not found')
                    setProduct(null)
                }
            } catch (err) {
                setError('Error fetching product')
                setProduct(null)
            }
        }

        getProduct()
    }, [productId])

    return (
        <main className="product-page-main">
            <PageHeader />
            <CategoriesNavbar />
            {product ? (
                <div className="product-page-main__container">
                    <MainPageSideBar />
                    <ProductView
                        productName={product.name}
                        vendor={product.vendor}
                        price={product.price}
                        quantity={product.quantity}
                        mappedDescription={product.description[i18n.language.split('-')[0]]}
                        mappedSpecifications={product.specifications[i18n.language.split('-')[0]]}
                        subcategoryName={product.subcategory_name}
                        model_path={product.model_path || null}
                        images_arr={product.image_paths}
                        reviews={product.reviews}
                        special_offer={product.special_offer}
                    />
                </div>
            ) : error ? (
                <p className="product-error">{error}</p>
            ) : (
                <p className="product-loading">Loading...</p>
            )}
        </main>
    )

}

export default ProductPage
