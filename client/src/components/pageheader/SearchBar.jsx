/**
 * @file SearchBar.jsx
 * @descrizione Componente React che rende una barra di ricerca per prodotti,
 *              con un campo di input e un pulsante con icona a lente di ingrandimento.
 *              Utilizza la libreria i18next per la traduzione del placeholder.
 *
 * @component
 * @returns {JSX.Element} Elemento form contenente un campo di ricerca e un pulsante.
 *
 * @accessibile Il campo input è accessibile con attributi `aria-label` e `autoComplete`.
 */
import './SearchBar.scss'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
    const { t } = useTranslation()
    
    const inputPlaceholder = t("Search products...")
    const buttonAriaLabel = t("Click here to search")

    return (
        <form className="product_search">
            <input type="search" placeholder={inputPlaceholder} className="search_input" autoComplete='off' aria-label="Search products" />
            <button className="search_button" type="submit" role="form" aria-label={buttonAriaLabel}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}

export default SearchBar
