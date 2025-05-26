import './ProductsContainer.scss'
import SpecialOffersContainer from '../specialofferscontainer/SpecialOffersContainer'
import CategoriesProduct from '../catogoriesproduct/CategoriesProduct'
import categories from '../../../../utils/categories'
import DefaultProductContainer from '../defaultproductcontainer/DefaultProductContainer'

const getRandomCategories = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

const ProductsContainer = ({ homeData }) => {   
    const specialOffers = homeData?.specialOffers
    const defaultProducts = homeData?.products
    const interestedCategories = getRandomCategories(categories, 4)

    return ( 
        <div className="products-container">
            <SpecialOffersContainer specialOffers={specialOffers || []}/>
            {interestedCategories.map(category => (
                <CategoriesProduct
                    key={category.id}
                    category={category.name}
                />
            ))}
            {defaultProducts && <DefaultProductContainer products={defaultProducts} /> }
        </div>
    )
}

export default ProductsContainer