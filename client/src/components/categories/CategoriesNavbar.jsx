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
import categories from '../../utils/categories'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { useUIStore } from '../../app/store/uistore'
import useNavbarAnimation from '.'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const CategoriesNavbar = () => {
    const { t } = useTranslation()
    const navbarRef = useRef(null)
    const toggleSidebarOpeningStatus = useUIStore(state => state.toggleSidebar)

    useNavbarAnimation(navbarRef)

    return (
        <nav className="categories-navbar" ref={navbarRef}>
            <span key={"all"} className="categories-span" onClick={toggleSidebarOpeningStatus}>
                <FontAwesomeIcon icon={faBars} />
            </span>
            {categories.map(cat => (
                <span key={cat.id} className="categories-span">
                    {t(cat.name)}
                </span>
            ))}
        </nav>
    )
}

export default CategoriesNavbar
