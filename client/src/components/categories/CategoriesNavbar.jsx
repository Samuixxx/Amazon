/**
 * @file CategoriesNavbar.jsx
 * @description Componente per la navbar delle categorie.
 *              Utilizza il custom hook `useNavbarAnimation` per aggiungere un'animazione
 *              di discesa a cascata per ciascun elemento della navbar.
 * 
 * @component
 * @example
 * // Esempio di utilizzo:
 * <CategoriesNavbar />
 * 
 * @returns {JSX.Element} La navbar con le categorie animate.
 */
import './CategoriesNavbar.scss'
import categories from "../../utils/categories"
import { useTranslation } from "react-i18next"
import { useRef } from "react"
import useNavbarAnimation from '.'

const CategoriesNavbar = () => {
    const { t } = useTranslation()
    const navbarRef = useRef(null)

    useNavbarAnimation(navbarRef)

    return (
        <nav className="categories_navbar" ref={navbarRef}>
            {categories.map(cat => (
                <span key={cat.id} className="categories_span">
                    {t(cat.name)}
                </span>
            ))}
        </nav>
    )
}

export default CategoriesNavbar
