import './Commerce.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeData } from '../../../features/home'
import CommerceCarousel from './carousel/CommerceCarousel'
import ProductsContainer from './productcontainer/ProductsContainer'


const CACHE_DURATION = 15 * 60 * 1000 
const Commerce = () => {
    const dispatch = useDispatch()
    const { data, timestamp, status } = useSelector(state => state.home)

    useEffect(() => {
        const now = Date.now()
        const expired = !timestamp || now - timestamp > CACHE_DURATION

        if (expired && status !== 'loading') {
            const controller = new AbortController()
            dispatch(fetchHomeData({ signal: controller.signal }))
            return () => controller.abort()
        }
    }, [dispatch, timestamp, status])

    return (
        <section className="commerce-container">
            <CommerceCarousel />
            <ProductsContainer homeData={data} />
        </section>
    )
}

export default Commerce