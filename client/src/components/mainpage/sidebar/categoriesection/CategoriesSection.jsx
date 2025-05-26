import './CategoriesSection.scss'
import { useTranslation } from 'react-i18next'
import categories from '../../../../utils/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'

const CategoriesSection = () => {
    const { t } = useTranslation()
    return (
        <section className="main-categories-container">
            <h2 className="main-categories-title">
                {t("Main categories")}
            </h2>
            {categories.slice(2, 8).map((cat, index, array) => (
                <div
                    className={`main-categories-container ${index === array.length - 1 ? 'last' : ''}`}
                    key={cat.id}
                >
                    <span className="main-categories-span">
                        {t(cat.name)}
                    </span>
                    <FontAwesomeIcon icon={faGreaterThan} size="xs" />
                </div>
            ))}
            <div className="daily-offers-link-container">
                <h2 className="daily-offers-title">
                    {t("Daily offers")}
                </h2>
                <span className="daily-offers-span">
                    {t("Find new offers for you")}
                </span>
                <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            </div>
            <div className="new-products-link-container">
                <h2 className="new-products-title">
                    {t("New releases")}
                </h2>
                <span className="new-products-span">
                    {t("Discover our latest arrivals")}
                </span>
                <FontAwesomeIcon icon={faGreaterThan} size="xs" />
            </div>
        </section>
    )
}

export default CategoriesSection